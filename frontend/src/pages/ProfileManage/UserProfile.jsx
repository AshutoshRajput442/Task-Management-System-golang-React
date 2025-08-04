import React, { useState, useEffect } from "react";

const UserProfile = () => {
  // Simulate fetched user
  const [user, setUser] = useState({
    name: "Ashu",
    email: "ashu@example.com",
    role: "Admin",
  });

  const [formData, setFormData] = useState(user);

  useEffect(() => {
    // TODO: Fetch user info from backend here
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit updated info to backend
    console.log("Updating user:", formData);
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <div className="bg-[#1a1a28] p-6 rounded shadow-md max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-[#2a2a3f] text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-[#2a2a3f] text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full p-2 bg-[#2a2a3f] text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Role</label>
            <input
              value={formData.role}
              readOnly
              className="w-full p-2 bg-[#2a2a3f] text-white rounded border border-gray-600 opacity-50 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white font-semibold"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
