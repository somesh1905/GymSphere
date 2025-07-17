import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import LogoutButton from "../components/LogoutButton";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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

    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Membership Plan</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="text-center border border-gray-700">
                  <td className="p-3 border">{user.name || "N/A"}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.mobile || "N/A"}</td>
                  <td className="p-3 border">{user.address || "N/A"}</td>
                  <td className="p-3 border">{user.planType || "No Plan"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default AdminDashboard;
