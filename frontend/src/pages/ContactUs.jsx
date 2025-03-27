import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    toast.success("Message Sent Successfully!");
  };

  return (
    <div>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6 relative">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="bg-gray-800 opacity-25 w-full h-full"></div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[color:var(--color-neon-blue)] opacity-10 pointer-events-none blur-3xl"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle,#00eaff11,#002233)] opacity-25 pointer-events-none"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg relative my-20"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-neon-blue">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
            <div>
              <label className="block text-gray-400 mb-2">Your Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full bg-transparent border border-gray-600 rounded-lg p-3 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue outline-none"
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Your Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
                })}
                className="w-full bg-transparent border border-gray-600 rounded-lg p-3 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue outline-none"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Your Message</label>
              <textarea
                {...register("message", { required: "Message cannot be empty" })}
                rows="4"
                className="w-full bg-transparent border border-gray-600 rounded-lg p-3 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue outline-none"
              ></textarea>
              {errors.message && <p className="text-red-400 text-sm">{errors.message.message}</p>}
            </div>

            <motion.button
              transition={{ duration: 0.2 }}
              type="submit"
              className="w-full bg-neon-blue text-black font-semibold p-3 rounded-lg hover:bg-opacity-90 hover:bg-cyan-600 transition-all duration-300"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
