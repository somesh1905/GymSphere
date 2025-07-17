import React, { useState,useEffect } from "react";
import { auth, db } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        toast.success("Login successful! 🎉");

        if (userData.role === "admin") navigate("/admin-dashboard");
        else if (userData.role === "member") navigate("/member-dashboard");
        else navigate("/user-dashboard");
      }
    } catch (error) {
      toast.error("Invalid email or password!");
    } finally {
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
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-96 bg-transparent-0.2">
        <h2 className="text-3xl font-bold text-center mb-6 text-white ">Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="w-full bg-red-600 p-3 rounded-lg hover:bg-red-700 flex justify-center">
            {loading ? <FaSpinner className="animate-spin" /> : "Login"}
          </button>
          <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <a href="/signup" className="text-red-400 hover:underline">SignUp</a>
        </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
