import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const features = [
    {
        icon: "🤖",
        title: "AI Speech Analysis",
        description: "Advanced AI-powered speech-to-text and sentiment analysis.",
    },
    {
        icon: "📊",
        title: "Real-Time Insights",
        description: "Instant feedback on pronunciation, clarity, and fluency.",
    },
    {
        icon: "🎭",
        title: "Facial Expression Detection",
        description: "Analyze emotions while speaking using AI vision models.",
    },
    {
        icon: "⚡",
        title: "Interactive Dashboard",
        description: "Track your progress with a futuristic analytics dashboard.",
    },
];

const Features = () => {
    return (
        <div>
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 relative">
                {/* Background Grid Effect */}
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px">
                    {[...Array(72)].map((_, i) => (
                        <div key={i} className="bg-gray-800 opacity-25 w-full h-full"></div>
                    ))}
                </div>

                <div className="absolute inset-0 bg-[color:var(--color-neon-blue)] opacity-10 pointer-events-none blur-3xl"></div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-center my-12 text-neon-blue"
                >
                    Features of <span className="text-blue-500">NeuroSpeak</span>
                </motion.h2>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-6xl">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="relative bg-gray-800 text-white rounded-xl p-6 shadow-lg transform perspective-1000"
                            initial={{ opacity: 0, y: 50, rotateY: 10 }}
                            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                        >
                            <div className="text-5xl mb-4 text-neon-blue">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Features;
