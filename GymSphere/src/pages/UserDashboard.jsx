import React from "react";
import LogoutButton from "../components/LogoutButton";
import { db, auth } from "../firebaseConfig"; // Import Firebase Firestore
import { doc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";

const plans = [
  { name: "1 Month Plan", price: 999, duration: 30 * 24 * 60 * 60 * 1000 },
  { name: "6 Months Plan", price: 4999, duration: 6 * 30 * 24 * 60 * 60 * 1000 },
  { name: "1 Year Plan", price: 8999, duration: 12 * 30 * 24 * 60 * 60 * 1000 },
];

const UserDashboard = () => {
  const user = auth.currentUser;

  const handlePayment = async (plan) => {
    if (!user) {
      alert("Please log in first!");
      return;
    }

    const options = {
      key: "rzp_test_your_test_key", // Replace with Razorpay test key
      amount: plan.price * 100, // Razorpay accepts amount in paise
      currency: "INR",
      name: "GymX Membership",
      description: `Purchase ${plan.name}`,
      handler: async (response) => {
        const startDate = serverTimestamp();
        const expiryDate = Timestamp.fromMillis(Date.now() + plan.duration);

        try {
          await setDoc(doc(db, "plans", user.uid), {
            userId: user.uid,
            planType: plan.name,
            startDate,
            expiryDate,
            status: "Active",
            paymentId: response.razorpay_payment_id,
          });
          alert(`Payment Successful! ${plan.name} activated.`);
        } catch (error) {
          console.error("Error saving plan: ", error);
          alert("Payment successful, but plan activation failed. Contact support.");
        }
      },
      prefill: {
        name: user.displayName || "Gym User",
        email: user.email,
        contact: "9876543210",
      },
      theme: { color: "#3399cc" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };
  return (
    <div className="min-h-screen bg-slate-950 ">
      {/* Navbar */}
      <nav className="bg-gray-900 p-4 flex justify-between items-center shadow-lg">
        <div className="text-2xl font-bold bg-transparent"><img src="/images/logo.png" alt="" /></div>
        <ul className="flex space-x-6 text-lg text-gray-400 font-bold pr-14">
          <li><a href="/plans" className="hover:text-red-700">Plans</a></li>
          <li><a href="/profile" className="hover:text-red-700">Profile</a></li>
          <li><a href="/about" className="hover:text-red-700">About Us</a></li>
          <li><a href="/contact" className="hover:text-red-700">Contact</a></li>
        </ul>
        <LogoutButton />
      </nav>

      {/* Banner Section */}
      <div className="relative">
        <img
          src="/images/hero-1.jpg"
          alt=""
          className="w-full h-[700px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-white">Transform Your Fitness Journey</h1>
          <p className="text-lg mt-2 text-gray-300">Join us & reach your fitness goals today!</p>
          <button  className="mt-4 bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700">Get Started</button>
        </div>
      </div>

      {/* Membership Plans Section */}
      <section className="p-10">
        <h2 className="text-3xl font-bold text-center text-white">Our Membership Plans</h2>
        <div className="flex justify-center gap-6 mt-8">
        {plans.map((plan, index) => (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center hover:bg-gray-900">
            <h3 className="text-4xl font-bold text-gray-300">{plan.name}</h3>
                <ul className="text-gray-400 py-4 px-6 ml-3 text-start" >
                    <li>✅ Personalised diet plan</li>
                    <li>✅ Unlimited equipments</li>
                    <li>✅ Personal trainer</li>
                    <li>✅ Weight losing classes</li>
                    <li>✅ No time restriction</li>
                </ul>
            <p className="mt-2 font-bold text-2xl text-gray-500">₹{plan.price}</p>
            <button onClick={() => handlePayment(plan)} className="mt-4 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-400">Join Now</button>
          </div>
          ))}
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-6 mt-10">
        <p className="text-gray-400">📍 Pune, Maharashtra | 📞 +91 9876543210 | 📧 contact@gymx.com</p>
        <div className="mt-4">
          <LogoutButton />
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
