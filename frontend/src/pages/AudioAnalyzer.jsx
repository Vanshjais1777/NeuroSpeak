import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import axios from "axios";
import AudioAnalysisResult from "../components/AudioAnalysisResult";

const AudioAnalyzer = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState(null);

  // Recorder State
  const [recording, setRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!audioFile) {
      toast.error("Please select an audio file first!");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      setUploading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/audio-to-text`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Audio uploaded successfully!");
      setData(response.data);
    } catch (error) {
      console.error("Upload Failed:", error);
      toast.error("Failed to upload audio.");
    } finally {
      setUploading(false);
    }
  };

  // Start Recording
  const handleRecordStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setRecordedAudio(URL.createObjectURL(audioBlob));
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      toast.success("Recording started...");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Microphone access denied.");
    }
  };

  // Stop Recording
  const handleRecordStop = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setRecording(false);
      toast.success("Recording stopped.");
    }
  };

  // Upload Recorded Audio
  const handleUploadRecordedAudio = async () => {
    if (!recordedAudio) {
      toast.error("No recorded audio available!");
      return;
    }

    const response = await fetch(recordedAudio);
    const audioBlob = await response.blob();
    const formData = new FormData();
    formData.append("audio", audioBlob, "recorded-audio.wav");

    try {
      setUploading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/audio-to-text`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Recorded audio uploaded successfully!");
      setData(response.data);
    } catch (error) {
      console.error("Upload Failed:", error);
      toast.error("Failed to upload recorded audio.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="bg-gray-800 opacity-25 w-full h-full"></div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[color:var(--color-neon-blue)] opacity-10 pointer-events-none blur-3xl"></div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:text-5xl text-2xl mt-5 font-extrabold text-neon-blue mb-6"
        >
          🎵 AI Speech Analyzer
        </motion.h1>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10 relative p-8 lg:w-96 w-64 bg-transparent bg-opacity-10 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 text-center"
        >
          <p className="lg:text-lg text-md text-gray-300 font-medium tracking-wide">
            Upload an audio file or record live speech.
          </p>

          {/* Select File */}
          <div className="mt-6 flex flex-col justify-center items-center">
            <label className="cursor-pointer mb-5">
              <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
              <span className="bg-gray-700 p-3 rounded-lg flex justify-center items-center gap-2">
                <img className="lg:h-7 h-5" src="src/assets/Upload audio icon.png" alt="" />
                Select Audio File
              </span>
            </label>

            {previewUrl && (
              <audio controls className="mt-4 w-60 lg:w-80">
                <source src={previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}

            <button
              onClick={handleUpload}
              className={`mt-6 px-6 lg:h-16 lg:w-52 py-3 text-xl text-black cursor-pointer font-semibold rounded-lg shadow-lg transition-all duration-300 
                ${uploading ? "bg-gray-500 cursor-not-allowed text-white" : "bg-neon-blue hover:bg-blue-400"}`}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Audio"}
            </button>
          </div>

          {/* Recording Section */}
          <div className="mt-6 flex flex-col justify-center items-center">
            {recording ? (
              <button
                onClick={handleRecordStop}
                className="bg-red-500 p-3 text-white rounded-lg flex items-center gap-2 animate-pulse"
              >
                ⏺ Recording... (Click to Stop)
              </button>
            ) : (
              <button
                onClick={handleRecordStart}
                className="bg-green-500 p-3 text-black rounded-lg flex items-center gap-2 cursor-pointer hover:bg-green-700"
              >
                <img className="h-5" src="src/assets/microphone-svgrepo-com.svg" alt="" />
                Start Recording
              </button>
            )}

            {recordedAudio && (
              <div className="mt-4">
                <audio controls className="w-60 lg:w-80">
                  <source src={recordedAudio} type="audio/wav" />
                </audio>
                <button
                  onClick={handleUploadRecordedAudio}
                  className="mt-4 bg-neon-blue px-4 py-2 rounded-lg text-black font-semibold"
                >
                  Upload Recorded Audio
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      <AudioAnalysisResult data={data} />
      <Footer />
    </div>
  );
};

export default AudioAnalyzer;
