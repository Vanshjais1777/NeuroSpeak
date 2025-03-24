import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Animation from "../assets/NotFound Animation.json";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px opacity-30">
        {[...Array(72)].map((_, i) => (
          <div key={i} className="bg-gray-800 opacity-25 w-full h-full"></div>
        ))}
      </div>

      {/* Neon Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#00eaff22,#001a33)] opacity-40 pointer-events-none"></div>

      {/* Robot Icon */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ yoyo: Infinity, duration: 1.5 }}
      >
      </motion.div>

      <div className="hidden md:flex justify-center items-center">
        <Lottie animationData={Animation} className="h-96 cursor-pointer" />
      </div>

      {/* Home Button */}
      <motion.a
        href="/"
        className="mt-6 px-6 py-3 bg-neon-blue text-black font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-400 transition duration-300 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.8)" }}
      >
        Return to Home
      </motion.a>
    </div>
  );
};

export default NotFound;
