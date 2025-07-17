import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg text-gray-300">📍 Address: 123 Fitness Street, Pune, India</p>
        <p className="text-lg text-gray-300">📞 Phone: +91 98765 43210</p>
        <p className="text-lg text-gray-300">📧 Email: support@gymx.com</p>

        <h3 className="text-2xl font-bold mt-4">Send a Message</h3>
        <input className="w-full p-2 rounded bg-gray-700 mt-2" type="text" placeholder="Your Name" />
        <input className="w-full p-2 rounded bg-gray-700 mt-2" type="email" placeholder="Your Email" />
        <textarea className="w-full p-2 rounded bg-gray-700 mt-2" placeholder="Your Message"></textarea>
        <button className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Contact;
