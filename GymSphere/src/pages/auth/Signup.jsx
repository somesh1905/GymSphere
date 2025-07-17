import React, { useState,useEffect } from "react";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";


const Signup = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [background, setBackground] = useState("");


  // Dynamically select a background image
  useEffect(() => {
    const gymImages = [
      "/images/gymlogin.jpg",
      "/images/signgym.jpg",

    ];
    const randomImage = gymImages[Math.floor(Math.random() * gymImages.length)];
    setBackground(randomImage);
  }, []);

  const navigate = useNavigate();
  

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    try {
      // Create User with Email & Password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save User Details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        mobile,
        address,
        email,
        uid: user.uid,
        role: "user", // Default role (can be "user", "member", or "admin")
      });
      
      toast.success("Account created successfully! 🎉");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.message);
    }finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center relative "
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(${background})`,
        
      }}
    >
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-gray-300"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <textarea
            placeholder="Address"
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-gray-300"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-red-600 p-3 rounded-lg hover:bg-red-700">
          {loading ? <FaSpinner className="animate-spin" /> : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-300">
          Already have an account?{" "}
          <a href="/Gym-Management-System" className="text-red-400 hover:underline">Login</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
