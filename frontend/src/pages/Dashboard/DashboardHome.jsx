import React from "react";
import { Link } from "react-router-dom";
import {
  FaList,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { GiProgression } from "react-icons/gi";
import { DashboardIcons } from "./DashboardIcons";

const iconMap = {
  FaList: <FaList size={24} />,
  ImCross: <ImCross size={24} />,
  FaClock: <FaClock size={24} />,
  GiProgression: <GiProgression size={24} />,
  FaCheckCircle: <FaCheckCircle size={24} />,
};

const DashboardHome = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
      <p className="text-gray-600 mb-6">Only logged-in users can see this.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {DashboardIcons.map((item, index) => (
          <Link
            key={index}
            to={item.path}  // This should be nested routes like '/dashboard/tasks'
            className="bg-[#1a1a28] shadow hover:shadow-md rounded p-4 flex items-center gap-4 transition"
          >
            <div className="text-purple-600">{iconMap[item.icon]}</div>
            <div className="text-white font-medium">{item.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
