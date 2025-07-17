import React from "react";
import LogoutButton from "../components/LogoutButton";

const MemberDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <h2 className="text-2xl font-bold text-center">Member Panel</h2>
        <nav className="mt-6">
          <ul>
            <li className="mb-4">
              <a href="/member-dashboard" className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a href="/membership-details" className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                My Membership
              </a>
            </li>
            <li className="mb-4">
              <a href="/workout-plans" className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                Workout Plans
              </a>
            </li>
            <li className="mb-4">
              <a href="/book-session" className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                Book a Session
              </a>
            </li>
            <li className="mb-4">
              <a href="/payments" className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                Payments
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome, Member</h1>
          <LogoutButton />
        </div>

        {/* Membership Status */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Membership Details</h2>
          <p className="mt-2 text-gray-400">Plan: <span className="text-white font-bold">Gold Membership</span></p>
          <p className="text-gray-400">Expiry Date: <span className="text-white font-bold">March 30, 2025</span></p>
          <button className="mt-4 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">Renew Membership</button>
        </div>

        {/* Workout Plan */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Your Workout Plan</h2>
          <ul className="mt-4">
            <li className="border-b border-gray-600 py-2">Monday - Chest & Triceps</li>
            <li className="border-b border-gray-600 py-2">Tuesday - Back & Biceps</li>
            <li className="border-b border-gray-600 py-2">Wednesday - Rest</li>
          </ul>
        </div>

        {/* Notifications */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Latest Notifications</h2>
          <ul className="mt-4">
            <li className="border-b border-gray-600 py-2">Gym will be closed on Sunday</li>
            <li className="border-b border-gray-600 py-2">New personal trainer available for sessions</li>
            <li className="py-2">Upcoming fitness challenge: Register now!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
