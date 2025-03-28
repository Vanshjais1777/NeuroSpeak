import React, { useState } from "react";
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


  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Preview the selected audio
      console.log("Selected File:", file.name); // Debugging: Log the selected file
    } else {
      console.warn("No file selected");
    }
  };


  // Handle file upload
  const handleUpload = async () => {
    if (!audioFile) {
      toast.error("Please select an audio file first!");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile); // 🔹 Make sure the key matches `req.file` in the backend

    try {
      setUploading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/audio-to-text`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Audio uploaded successfully!");
      setData(response.data); // Set the response data to state
    } catch (error) {
      console.error("Upload Failed:", error);
      toast.error("Failed to upload audio.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">

        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="bg-gray-800 opacity-30 w-full h-full"></div>
          ))}
        </div>

        {/* Neon Glow Effect */}
        <div className="absolute inset-0 bg-[color:var(--color-neon-blue)] opacity-10 blur-3xl"></div>

        {/* Floating Gradient Background
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-800 opacity-20 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      /> */}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:text-5xl text-2xl mt-5 font-extrabold text-neon-blue mb-6"
        >
          🎵 AI Speech Analyzer
        </motion.h1>

        {/* Futuristic Glass Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative p-8 lg:w-96 w-64 bg-transparent bg-opacity-10 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 text-center"
        >
          <p className="lg:text-lg text-md text-gray-300 font-medium tracking-wide">
            Upload an audio file to analyze fear, confidence,and nervousness in your Speech.
          </p>

          {/* Dummy Upload Button */}
          <div className="mt-6 flex flex-col justify-center items-center">
            <label className="cursor-pointer mb-5">
              <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
              <span className="bg-gray-700 p-3 rounded-lg flex justify-center items-center gap-2">
                <img className="lg:h-7 h-5" src="src/assets/Upload audio icon.png" alt="" />
                Select Audio File
              </span>
            </label>

            {/* Audio Preview */}
            {previewUrl && (
              <audio controls className="mt-4 w-60 lg:w-80">
                <source src={previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}

            <button
              onClick={handleUpload}
              className={`mt-6 px-6 lg:h-16 lg:w-52 py-3 text-xl text-black font-semibold rounded-lg shadow-lg transition-all duration-300 
                ${uploading ? "bg-gray-500 cursor-not-allowed text-white" : "bg-neon-blue hover:bg-blue-400"}`}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Audio"}
            </button>
          </div>
        </motion.div>

        {/* Floating Neon Orbs */}
        {/* <motion.div
        className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500 opacity-30 blur-2xl rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-16 right-16 w-32 h-32 bg-purple-500 opacity-30 blur-2xl rounded-full"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      /> */}
      </div>
      <AudioAnalysisResult data={data} />
      <Footer />
    </div>
  );
};

export default AudioAnalyzer;

