import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db,  } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setFormData(userDoc.data());
          setImageUrl(userDoc.data().profilePic || "");
        }
      }
    };
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, "users", user.uid), { ...formData, profilePic: imageUrl });
      setUserData(formData);
      setEditing(false);
    }
  };

  

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg text-center"
        whileHover={{ scale: 1.02 }}
      >
        {/* Profile Picture Section */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={imageUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-gray-700"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700"
          >
            <FaEdit size={16} />
          </label>
        </div>

        {/* User Info Section */}
        <h2 className="text-2xl font-bold">{formData.name || "User Name"}</h2>
        <p className="text-gray-400">{formData.email || "user@example.com"}</p>

        <div className="mt-6 space-y-3">
          <label className="block">Mobile:</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-center"
            value={editing ? formData.mobile : userData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            disabled={!editing}
          />

          <label className="block">Address:</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-center"
            value={editing ? formData.address : userData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={!editing}
          />
        </div>

        {/* Edit/Save Button */}
        {editing ? (
          <motion.button
            onClick={handleUpdate}
            className="mt-4 bg-blue-600 p-2 rounded w-full hover:bg-blue-700"
            whileTap={{ scale: 0.95 }}
          >
            Save Changes
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setEditing(true)}
            className="mt-4 bg-gray-600 p-2 rounded w-full hover:bg-gray-700"
            whileTap={{ scale: 0.95 }}
          >
            Edit Profile
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Profile;
