import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../assets/Login animation.json"; // Different animation for login
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import useAuthStore from "../store/authStore";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuthStore();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, data);
      login(res.data.user, res.data.token);
      toast.success("Welcome Back to NeuroSpeak!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed.";
      setError(errorMessage);
      toast.error(errorMessage)
    }
  };

  return (
    <div>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-black overflow-hidden px-4 md:px-8 lg:px-16 gap-60 md:gap-52 sm:gap-10 text-sm lg:text-lg">
        {/* Glowing Background Effect */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-12 left-1/4 w-40 md:w-80 h-40 md:h-80 bg-purple-600 opacity-40 blur-3xl rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
          <motion.div
            className="absolute bottom-10 right-1/4 w-40 md:w-80 h-40 md:h-80 bg-cyan-400 opacity-40 blur-3xl rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative p-6 md:p-8 rounded-2xl shadow-xl mt-32 mb-10 w-full max-w-md md:max-w-lg text-white z-10 bg-gray-900/80 backdrop-blur-lg"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center text-cyan-400 tracking-wider m-3 md:m-5 bg-slate-600/10 p-3 rounded-md">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
                className="w-full p-3 mt-1 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className="w-full p-3 mt-1 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="w-full bg-cyan-500 text-black hover:bg-cyan-600 transition-all py-3 rounded-lg font-semibold shadow-md cursor-pointer"
            >
              Login
            </motion.button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <div className="w-1/3 border-t border-gray-600"></div>
            <p className="mx-2 text-gray-400">OR</p>
            <div className="w-1/3 border-t border-gray-600"></div>
          </div>

          {/* <div className="mt-4 flex justify-center">
          <GoogleLogin onSuccess={() => toast.success("Google Login Success")} onError={() => setError("Google Sign-In failed.")} />
        </div> */}

          <p className="mt-4 text-gray-400 text-sm text-center">
            Don't have an account? <a href="/signup" className="text-cyan-400 cursor-pointer hover:underline">Sign Up</a>
          </p>
        </motion.div>

        {/* Animated Futuristic Robot - Hidden on Small Screens */}
        <div className="hidden md:flex justify-center items-center">
          <Lottie animationData={loginAnimation} className="max-w-xl max-h-96 cursor-pointer" />
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default Login;
