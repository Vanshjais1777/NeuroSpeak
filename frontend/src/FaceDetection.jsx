import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceDetection = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [expressions, setExpressions] = useState({});

    // Load models when the component mounts
    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = import.meta.env.BASE_URL + "models";
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
            console.log("Models Loaded ✅");
            startVideo();
        };

        loadModels();
    }, []);

    // Start webcam feed
    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Error accessing webcam:", error);
        }
    };

    // Detect emotions in real-time
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
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold mb-4">🎭 Real-Time Emotion Detection</h1>
            <video ref={videoRef} autoPlay muted className="rounded-lg shadow-lg" style={{ width: "400px" }} />
            <canvas ref={canvasRef} className="absolute top-0 left-0" />

            <div className="mt-5 bg-gray-200 p-4 rounded-lg">
                <h2 className="text-xl font-semibold">Detected Emotions:</h2>
                {Object.keys(expressions).length > 0 ? (
                    <ul className="mt-2">
                        {Object.entries(expressions).map(([emotion, value]) => (
                            <li key={emotion} className="text-lg">
                                {emotion}: <strong>{(value * 100).toFixed(2)}%</strong>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No face detected...</p>
                )}
            </div>
        </div>
    );
};

export default FaceDetection;
