import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-black text-white lg:h-[80vh] flex items-center justify-center relative overflow-hidden lg:pt-44 pt-40">
            {/* Background Grid */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px">
                {[...Array(72)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-800 opacity-25 w-full h-full"
                    ></div>
                ))}
            </div>

            {/* Neon Glow Effect */}
            <div className="absolute inset-0 bg-[color:var(--color-neon-blue)] opacity-10 blur-3xl"></div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-6"
            >
                <h1 className="text-3xl md:text-6xl font-bold mb-5">
                    Enhance Your <span className="text-[color:var(--color-neon-blue)]">Communication</span> Skills with AI-Powered Insights!
                </h1>
                <p className="text-md md:text-2xl mb-8 max-w-5xl mx-auto">
                    Master Public Speaking through Intelligent Analysis of Face Expressions and Customized Recommendations
                </p>
                <div className='flex gap-6 justify-center items-center'>
                    <button
                        onClick={() => navigate("/video-analyzer")}
                        className="font-medium lg:px-6 px-4 lg:py-3 py-2 rounded-md lg:text-lg transition duration-300 ease-in-out bg-neon-blue text-black cursor-pointer border-2 border-neon-blue">
                        Try Now
                    </button>
                    <button className="font-medium lg:px-6 lg:py-3 px-4 py-2 rounded-md lg:text-lg transition duration-300 ease-in-out border-2 border-neon-blue text-white cursor-pointer">
                        Watch Demo
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
