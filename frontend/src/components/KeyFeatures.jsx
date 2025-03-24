import React from 'react';
import { FaMicrophoneAlt, FaSmile, FaChartLine, FaLock, FaChartBar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <FaMicrophoneAlt size={30} className="text-neon-blue" />,
        title: 'Live Video Analysis',
        description: 'AI evaluates grammar, tone, and confidence.',
    },
    {
        icon: <FaSmile size={30} className="text-neon-blue" />,
        title: 'Facial Expression Recognition',
        description: 'Detects emotions and nervousness.',
    },
    {
        icon: <FaChartLine size={30} className="text-neon-blue" />,
        title: 'Real-Time AI Feedback',
        description: 'Instant suggestions to improve communication.',
    },
    {
        icon: <FaChartBar size={30} className="text-neon-blue" />,
        title: 'Progress Tracking',
        description: 'Monitor improvements over time with analytics.',
    },
    {
        icon: <FaLock size={30} className="text-neon-blue" />,
        title: 'Private & Secure',
        description: 'Your data is protected with end-to-end encryption.',
    },
];

const KeyFeatures = () => {
    return (
        <motion.div
            // initial={{ opacity: 0, y: 50 }}
            // animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center"
        >
            <section className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden py-36">
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px">
                    {[...Array(72)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-800 opacity-25 w-full h-full"
                        ></div>
                    ))}
                </div>
                <div className="absolute inset-0 bg-[color:var(--color-neon-blue)] opacity-10 blur-3xl"></div>
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose NeuroSpeak?</h2>
                    <div className="flex flex-wrap justify-center">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="max-w-sm bg-gray-800 rounded-lg shadow-lg p-6 m-4 transform hover:scale-105 transition-transform duration-300"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-gray-700 rounded-full">{feature.icon}</div>
                                    <h3 className="ml-4 text-xl font-semibold">{feature.title}</h3>
                                </div>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default KeyFeatures;
