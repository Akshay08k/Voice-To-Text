import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [voiceOutput, setVoiceOutput] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.onstart = () =>
        console.log("Voice recognition started.");
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceOutput(transcript);
      };
      setRecognition(recognitionInstance);
    } else {
      console.warn("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  const handleSpeak = () => {
    const splitTextIntoChunks = (text, maxChunkLength) => {
      const chunks = [];
      let startIndex = 0;
      while (startIndex < text.length) {
        let endIndex = Math.min(startIndex + maxChunkLength, text.length);
        chunks.push(text.slice(startIndex, endIndex));
        startIndex = endIndex;
      }
      return chunks;
    };

    const speakChunks = (chunks, index = 0) => {
      if (index < chunks.length) {
        const utterance = new SpeechSynthesisUtterance(chunks[index]);
        const voices = speechSynthesis.getVoices();
        const femaleVoice = voices.find(
          (voice) =>
            voice.lang.startsWith("en") &&
            voice.name.toLowerCase().includes("female")
        );
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        utterance.onend = () => speakChunks(chunks, index + 1);
        speechSynthesis.speak(utterance);
      }
    };

    const maxChunkLength = 200; // Adjust this value as needed
    const textChunks = splitTextIntoChunks(text, maxChunkLength);
    speakChunks(textChunks);
  };

  const handleRecord = () => {
    if (recognition) {
      recognition.start();
    }
  };

  return (
    <div className="bg-darkBg flex items-center justify-center h-screen">
      <div className="container mx-auto p-4 bg-darkCard rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-darkText">Text to Voice</h1>
        <textarea
          id="text-input voice-output"
          className="w-full p-2 border border-darkButton rounded mb-4 bg-darkTextarea text-darkText"
          rows="4"
          placeholder="Enter text here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          id="speak-btn"
          className="bg-darkButton text-white px-4 py-2 rounded mb-4 hover:bg-darkButtonHover"
          onClick={handleSpeak}
        >
          Speak
        </button>
        <button
          id="record-btn"
          className="bg-darkButton text-white px-4 py-2 rounded hover:bg-darkButtonHover"
          onClick={handleRecord}
        >
          Start Recording
        </button>
        <p id="voice-output" className="mt-4 text-darkText">
          {voiceOutput}
        </p>
      </div>
    </div>
  );
}

export default App;
