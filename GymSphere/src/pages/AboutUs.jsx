import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <motion.h2 
        className="text-4xl font-bold mb-6"
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h2>
      
      <motion.div 
        className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg text-center"
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <p className="text-lg text-gray-300">
          Welcome to <span className="text-blue-400 font-bold">GymX</span>, your ultimate fitness destination!  
          We provide world-class equipment, expert trainers, and a motivating environment to help you achieve your goals.  
          Join us and transform your fitness journey today!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;
