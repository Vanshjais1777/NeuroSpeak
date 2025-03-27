import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GradientAnimation from "../assets/VideoAnalyzer Animation.json";
import Lottie from "lottie-react";
import { Toaster, toast } from "react-hot-toast";

const VideoAnalyzer = () => {
    const videoRef = useRef(null);
    const [expressions, setExpressions] = useState({});

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = import.meta.env.BASE_URL + "models";
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
            toast.success("Face models loaded!");
            startVideo();
        };

        loadModels();
    }, []);

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
            videoRef.current.srcObject = stream;
        } catch (error) {
            toast.error("Webcam access denied!");
        }
    };

    const detectEmotions = async () => {
        if (!videoRef.current) return;

        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        if (detections.length > 0) {
            setExpressions(detections[0].expressions);
        }

        requestAnimationFrame(detectEmotions);
    };

    useEffect(() => {
        videoRef.current?.addEventListener("play", () => {
            detectEmotions();
        });
    }, []);

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <Header />
            <div className="p-10 relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
                {/* Cyberpunk Grid Background */}
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px">
                    {[...Array(72)].map((_, i) => (
                        <div key={i} className="bg-gray-800 opacity-30 w-full h-full"></div>
                    ))}
                </div>

                {/* Neon Glow Effect */}
                <div className="absolute inset-0 bg-[color:var(--color-neon-blue)] opacity-10 blur-3xl"></div>

                <Lottie
                    animationData={GradientAnimation}
                    loop
                    className="absolute inset-0 w-full min-h-96 object-cover opacity-70"
                />

                {/* Header */}
                <motion.h1
                    className="md:text-4xl lg:text-6xl text-2xl underline underline-offset-4 font-semibold lg:font-extrabold text-neon-blue tracking-widest relative z-10 lg:mt-20 mt-12 min-w-screen text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Live Video Analysis
                </motion.h1>

                {/* Video Feed with Holographic Effect */}
                <motion.div
                    className="relative mt-8 lg:mt-16 border-4 border-neon-blue rounded-lg shadow-lg overflow-hidden p-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <video ref={videoRef} autoPlay muted className="rounded-lg shadow-lg holographic" style={{ width: "500px" }} />
                    <div className="absolute inset-0 border-2 border-cyan-300 rounded-lg opacity-50 animate-pulse"></div>
                </motion.div>

                {/* Animated Emotion Dashboard */}
                <motion.div
                    className="mt-6 bg-glassmorphism text-white p-6 rounded-xl backdrop-blur-lg border border-cyan-400 shadow-xl relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h2 className="lg:text-2xl md:text-2xl text-xl mb-4 underline underline-offset-2 font-bold text-neon-blue">Detected Emotions</h2>
                    {Object.keys(expressions).length > 0 ? (
                        <div className="grid lg:grid-cols-4 lg:gap-10 lg:mt-3">
                            {Object.entries(expressions).map(([emotion, value]) => (
                                <motion.div
                                    key={emotion}
                                    className="text-lg text-gray-200 flex justify-center items-center gap-5"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {emotion.toUpperCase()}: <strong className="text-cyan-400">{(value * 100).toFixed(2)}%</strong>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No face detected...</p>
                    )}
                </motion.div>
            </div>
            <Footer />
        </div>

    );
};

export default VideoAnalyzer;
