import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const pricingPlans = [
    {
        name: "Basic",
        price: "Free",
        features: ["AI Speech-to-Text", "Basic Sentiment Analysis", "Limited Reports"],
    },
    {
        name: "Pro",
        price: "$9.99/mo",
        features: ["Advanced AI Analysis", "Real-Time Insights", "Unlimited Reports"],
    },
    {
        name: "Premium",
        price: "$19.99/mo",
        features: ["Facial Emotion Detection", "AI Fluency Scoring", "Custom AI Coaching"],
    },
];

const Pricing = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    return (
        <div>
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 relative">
                {/* Background Grid */}
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
                    Choose Your <span className="text-blue-500">Plan</span>
                </motion.h2>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`relative bg-gray-800 text-white rounded-xl p-8 shadow-lg backdrop-blur-lg border border-blue-500/30 ${selectedPlan === index ? "scale-105 border-blue-500" : ""
                                }`}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.4)" }}
                            onClick={() => setSelectedPlan(index)}
                        >
                            <h3 className="text-2xl font-semibold mb-4 text-center">{plan.name}</h3>
                            <p className="text-3xl font-bold text-center text-blue-400">{plan.price}</p>
                            <ul className="mt-4 space-y-2">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center space-x-2">
                                        <span className="text-green-400">✔</span>
                                        <p>{feature}</p>
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-6 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Pricing;
