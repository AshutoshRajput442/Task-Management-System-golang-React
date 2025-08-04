import React, { useEffect, useState } from "react";
import { FaUserEdit, FaTrash, FaPlus } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // TODO: Fetch users from backend
    setUsers([
      { id: 1, name: "Ashu", email: "ashu@example.com", role: "Admin", status: "Active" },
      { id: 2, name: "John", email: "john@example.com", role: "User", status: "Inactive" },
    ]);
  }, []);

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Manage Users</h2>

      <div className="flex justify-end mb-4">
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2">
          <FaPlus /> Add User
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-[#1a1a28] text-white">
          <thead>
            <tr className="text-left border-b border-gray-600">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-[#2a2a3f] border-b border-gray-700">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-sm font-semibold 
                    ${user.status === "Active" ? "bg-green-600" : "bg-red-600"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
