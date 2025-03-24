import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-12 pb-6 px-6 md:px-12 lg:px-20 text-center">
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Your <span className="text-neon-blue">AI Communication Analysis</span> Today!
        </h2>
        <p className="text-gray-400 mb-6">
          Gain real-time insights, improve confidence, and master communication with NeuroSpeak AI.
        </p>

        <Link to="/signup">
          <button className="bg-neon-blue hover:bg-blue-400 text-black font-semibold py-3 px-6 rounded-lg text-lg shadow-lg transition-all duration-300">
            Sign Up for Free
          </button>
        </Link>

        <div className="mt-8 w-full max-w-lg">
          <p className="text-gray-400 mb-3">Stay updated with AI insights & communication tips!</p>
          <div className="flex items-center justify-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-2/3 rounded-lg bg-gray-800 text-white border border-gray-600 outline-none focus:border-blue-400"
            />
            <button className="bg-neon-blue hover:bg-blue-400 px-4 py-2 rounded-lg text-black font-semibold transition-all">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <a href="#" className="text-gray-400 hover:text-neon-blue transition-all text-2xl">
            <FaFacebookF />
          </a>
          <a href="#" className="text-gray-400 hover:text-neon-blue transition-all text-2xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-400 hover:text-neon-blue transition-all text-2xl">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-400 hover:text-neon-blue transition-all text-2xl">
            <FaLinkedin />
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-8 text-gray-400 text-sm">
          <Link to="/features" className="hover:text-neon-blue transition-all">
            Features
          </Link>
          <Link to="/pricing" className="hover:text-neon-blue transition-all">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-neon-blue transition-all">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-neon-blue transition-all">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-neon-blue transition-all">
            Privacy Policy
          </Link>
        </div>

        <div className="w-full h-px bg-gray-700 my-8"></div>

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} NeuroSpeak. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
