// audioRecorder.js
export class AudioRecorder {
  constructor({ sampleRate = 16000 } = {}) {
    this.sampleRate = sampleRate;
    this.mediaRecorder = null;
    this.stream = null;
  }

  async start() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create an audio context
      const audioContext = new AudioContext({
        sampleRate: this.sampleRate,
      });

      const source = audioContext.createMediaStreamSource(this.stream);
      const processor = audioContext.createScriptProcessor(2048, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      return new ReadableStream({
        start(controller) {
          processor.onaudioprocess = (e) => {
            const audioData = e.inputBuffer.getChannelData(0);
            controller.enqueue(audioData);
          };
        },
        cancel() {
          processor.disconnect();
          source.disconnect();
          this.stream.getTracks().forEach((track) => track.stop());
        },
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      throw error;
    }
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }
}
