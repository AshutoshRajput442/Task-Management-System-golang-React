import React, { useState, useEffect } from "react";
import { fetchUserProfile } from './../../api/userApi';

const UserProfile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetchUserProfile(token)
      .then((data) => setUser({ name: data.name, email: data.email }))
      .catch((err) => {
        console.error(err);
        alert("Error fetching profile");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    updateUserPassword(token, password)
      .then(() => {
        alert("Password updated successfully!");
        setPassword("");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update password");
      });
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <div className="bg-[#1a1a28] p-6 rounded shadow-md max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Name</label>
            <input
              value={user.name}
              readOnly
              className="w-full p-2 bg-[#2a2a3f] text-white rounded border border-gray-600 opacity-50 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              value={user.email}
              readOnly
              className="w-full p-2 bg-[#2a2a3f] text-white rounded border border-gray-600 opacity-50 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">New Password</label>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 bg-[#2a2a3f] text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white font-semibold"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
