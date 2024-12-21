import { GoogleGenerativeAI } from "@google/generative-ai";
import { AssemblyAI } from "assemblyai";
import fs from "fs";
import path from "path";
import os from "os";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retryWithBackoff(fn, retries = MAX_RETRIES) {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await sleep(RETRY_DELAY * (MAX_RETRIES - retries + 1));
      return retryWithBackoff(fn, retries - 1);
    }
    throw error;
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio");
    const targetText = formData.get("targetText");
    if (!audioFile || audioFile.size < 1000) {
      return new Response(
        JSON.stringify({
          error: "No audio detected or audio file too small",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // Save the blob temporarily
    const tempFilePath = path.join(os.tmpdir(), "recording.wav");
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    fs.writeFileSync(tempFilePath, audioBuffer);

    // Transcribe the audio
    const transcribedText = await transcribe_audio(tempFilePath);
    if (!transcribedText || transcribedText.trim() === "") {
      return new Response(
        JSON.stringify({
          error: "No speech detected in the recording",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Clean up temp file
    fs.unlinkSync(tempFilePath);

    // Retry Gemini API calls with backoff
    const feedback = await retryWithBackoff(async () => {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
      You are an experienced and precise language pronunciation tutor. A student is practicing their English pronunciation. 
      Please analyze their attempt with extreme attention to detail.
      
      Target Text: "${targetText}"
      Transcribed Speech: "${transcribedText}"
      
      Important Guidelines:
      1. CAREFULLY compare each word in the target text with what was actually spoken
      2. If a word sounds like something else (e.g., "the" vs "tea"), mark it as incorrect
      3. Do not praise incorrect pronunciations even if they sound like real words
      4. Always compare against the target text, not what you think they might have meant
      
      Please provide feedback in this exact format:
      1. Accuracy: List ONLY words that were pronounced exactly as they should be
      2. Areas for Improvement: List each word that differs from the target text, showing both the target word and how it was pronounced
      3. Practice Tips: Provide specific tips for the most important pronunciation issues
      4. Encouragement: Add a motivating comment
      
      Remember:
      - Be precise and accurate in your assessment
      - Don't mark similar-sounding words as correct if they're different from the target
      - Focus on actual pronunciation differences, not transcription errors
      - Be encouraging but honest about areas needing improvement`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    });

    return new Response(
      JSON.stringify({
        feedback,
        transcribedText,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error details:", error);

    // Provide more specific error messages
    let errorMessage = "Failed to process audio";
    if (error.message.includes("503")) {
      errorMessage =
        "AI service temporarily unavailable. Please try again in a few moments.";
    } else if (error.message.includes("transcription failed")) {
      errorMessage =
        "Failed to transcribe audio. Please ensure clear audio quality.";
    }

    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: error.message,
      }),
      {
        status: error.message.includes("503") ? 503 : 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

const transcribe_audio = async (audioFile) => {
  const client = new AssemblyAI({
    apiKey: "69b9ba57082c4e5a8f40b40c1425fa1a",
  });

  const params = {
    audio: audioFile,
    speaker_labels: false,
  };

  const transcript = await client.transcripts.transcribe(params);

  if (transcript.status === "error") {
    throw new Error(`Transcription failed: ${transcript.error}`);
  }

  return transcript.text;
};
