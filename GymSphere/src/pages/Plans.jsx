import React from "react";
import { motion } from "framer-motion";

const plans = [
  { name: "1 Month Plan", price: "₹999", benefits: ["Gym Access", "1 PT Session"] },
  { name: "6 Months Plan", price: "₹4999", benefits: ["Gym Access", "5 PT Sessions", "Diet Plan"] },
  { name: "1 Year Plan", price: "₹8999", benefits: ["Gym Access", "10 PT Sessions", "Personalized Plan"] },
];

const Plans = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold mb-6">Membership Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div 
            key={index} 
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-xl text-blue-400">{plan.price}</p>
            <ul className="mt-3 text-gray-300">
              {plan.benefits.map((benefit, i) => (
                <li key={i}>✔ {benefit}</li>
              ))}
            </ul>
            <motion.button 
              className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
              whileTap={{ scale: 0.95 }}
            >
              Choose Plan
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Plans;
