import React, { useState } from 'react'
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    return (
        <header className="bg-black text-white shadow-lg relative z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => navigate("/")}
                    className="text-2xl md:text-3xl font-bold tracking-wide text-[color:var(--color-neon-blue)] cursor-pointer"
                >
                    NeuroSpeak
                </motion.h1>

                {/* Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-[color:var(--color-neon-blue)]"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Navigation */}
                <nav
                    className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-black md:bg-transparent transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden md:block"
                        }`}
                >
                    <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-lg font-medium my-2">
                        <NavLink to="/" className={({ isActive }) =>
                            `cursor-pointer ${isActive ? "text-neon-blue" : "text-white"
                            }`
                        }>
                            Home
                        </NavLink>
                        <NavLink to="/features" className={({ isActive }) =>
                            `cursor-pointer ${isActive ? "text-neon-blue" : "text-white"
                            }`
                        }>
                            Features
                        </NavLink>
                        <NavLink to="/pricing" className={({ isActive }) =>
                            `cursor-pointer ${isActive ? "text-neon-blue" : "text-white"
                            }`
                        }>
                            Pricing
                        </NavLink>
                        <NavLink to="/contact-us" className={({ isActive }) =>
                            `cursor-pointer ${isActive ? "text-neon-blue" : "text-white"
                            }`
                        }>
                            Contact
                        </NavLink>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header