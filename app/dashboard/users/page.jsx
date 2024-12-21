"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FeedbackSection } from "@/components/feedback";
import Container from "@/components/global/container";

const PronunciationPractice = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [audioURL, setAudioURL] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioDetected, setIsAudioDetected] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingTimerRef = useRef(null);

  const targetText = "The sun rises early in the summer months.";
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      const startTime = Date.now();
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(recordingTimerRef.current);
      setRecordingDuration(0);
    }
    return () => clearInterval(recordingTimerRef.current);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
        setAudioURL("");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Add audio level detection
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);

      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkAudioLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const audioLevel = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setIsAudioDetected(audioLevel > 10); // Threshold for audio detection
        if (isRecording) {
          requestAnimationFrame(checkAudioLevel);
        }
      };

      requestAnimationFrame(checkAudioLevel);

      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        if (audioBlob.size < 1000) {
          // Less than 1KB
          setError("No audio detected. Please speak while recording.");
          return;
        }
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        // Create FormData and send to API
        const formData = new FormData();
        formData.append("audio", audioBlob);
        formData.append("targetText", targetText);

        try {
          const response = await fetch("/api/analyze-audio", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          // Set both transcribed text and feedback
          if (data.transcribedText) {
            setTranscribedText(data.transcribedText);
          }
          if (data.feedback) {
            setFeedback(data.feedback);
          }
          if (data.error) {
            setError(data.error);
          }
        } catch (err) {
          setError("Error analyzing audio. Please try again.");
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError(
        "Error accessing microphone. Please ensure you have granted permission."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };
  const speakFeedback = () => {
    if ("speechSynthesis" in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(
        feedback.replace(/\*\*/g, "").replace(/\n\n/g, "\n")
      );

      // Optional: Configure the voice
      utterance.rate = 0.9; // Slightly slower
      utterance.pitch = 1;
      utterance.volume = 1;

      // Get voices and set a good English voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find((voice) => voice.lang.includes("en-"));
      if (englishVoice) utterance.voice = englishVoice;

      utterance.onend = () => {
        setIsPlaying(false);
      };

      speechSynthesis.speak(utterance);
    }
  };
  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <Container>
      <Card className="p-6 max-w-5xl mx-auto dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
          Pronunciation Practice
        </h2>

        <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg mb-6 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Target Text:
          </p>
          <p className="text-2xl font-medium text-blue-900 dark:text-blue-200">
            {targetText}
          </p>
        </div>

        <div className="flex flex-col items-center mb-6">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-8 py-4 rounded-full font-semibold transition-all ${
              isRecording
                ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 animate-pulse"
                : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            } text-white mb-2`}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>

          {isRecording && (
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Recording: {recordingDuration}s
              </p>
              {isAudioDetected ? (
                <p className="text-sm text-green-500 dark:text-green-400">
                  Audio detected ✓
                </p>
              ) : (
                <p className="text-sm text-yellow-500 dark:text-yellow-400">
                  No audio detected...
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-center">
            {error}
          </div>
        )}

        {audioURL && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold mb-3 dark:text-white">
              Your Recording:
            </h3>
            <audio
              controls
              src={audioURL}
              className="w-full dark:bg-gray-600"
            />
          </div>
        )}

        {transcribedText && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">
              Your Reading:
            </h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200">
              {transcribedText}
            </div>
          </div>
        )}

        {feedback && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Feedback
              </h3>
              <button
                onClick={isPlaying ? stopSpeaking : speakFeedback}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  isPlaying
                    ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                    : "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                } text-white`}
              >
                {isPlaying ? "Stop Playing" : "Play Feedback"}
              </button>
            </div>
            <FeedbackSection feedback={feedback} />
          </div>
        )}
      </Card>
    </Container>
  );
};

export default PronunciationPractice;
