// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { MdDashboard } from "react-icons/md";
// import { ImProfile } from "react-icons/im";
// import { IoIosNotifications } from "react-icons/io";
// import { RiLogoutCircleFill } from "react-icons/ri";
// import { FaTasks, FaUserFriends, FaPlus, FaList } from "react-icons/fa";

// import { sidebarIcons } from "./sidebarIcons";
// const NavBar = () => {
//   const [name, setName] = useState("");

//   useEffect(() => {
//     // Fetch userName from localStorage or wherever you saved it
//     const storedName = localStorage.getItem("name") || "@guest";
//     console.log(storedName);
//     setName(storedName);
//   }, []);

//   const NavIcons = {
//     MdDashboard: <MdDashboard size={20} />,
//     ImProfile: <ImProfile size={20} />,
//     IoIosNotifications: <IoIosNotifications size={20} />,
//     RiLogoutCircleFill: <RiLogoutCircleFill size={20} />,
//     FaTasks: <FaTasks size={20} />,
//     FaUserFriends: <FaUserFriends size={20} />,
//     FaPlus: <FaPlus size={20} />,
//     FaList: <FaList size={20} />,
//   };

//   return (
//     <nav className="w-64 bg-[#1a1a28] text-gray-400 flex flex-col p-6">
//       {/* User info */}
//       <div className="flex flex-col items-center mb-8">
//         <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-white text-3xl mb-2">
//           {/* Placeholder for user profile image */}
//           {name.charAt(0).toUpperCase()}
//         </div>
//         <p className="text-white font-semibold">{name}</p>
//       </div>

//       {/* Navigation links */}
//       <ul className="flex-1 space-y-3">
//         {sidebarIcons.map((item, index) => (
//           <li key={index}>
//             <NavLink
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
//                   isActive ? "bg-purple-700 text-white" : "hover:bg-gray-700"
//                 }`
//               }
//             >
//               <span>{NavIcons[item.icon]}</span>
//               <span>{item.label}</span>
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaTasks, FaUserFriends, FaPlus, FaList } from "react-icons/fa";

import { sidebarIcons } from "./sidebarIcons";

const NavBar = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "Guest";
    setName(storedName);
  }, []);

  const NavIcons = {
    MdDashboard: <MdDashboard size={20} />,
    ImProfile: <ImProfile size={20} />,
    IoIosNotifications: <IoIosNotifications size={20} />,
    RiLogoutCircleFill: <RiLogoutCircleFill size={20} />,
    FaTasks: <FaTasks size={20} />,
    FaUserFriends: <FaUserFriends size={20} />,
    FaPlus: <FaPlus size={20} />,
    FaList: <FaList size={20} />,
  };

  return (
    <nav className="w-64 bg-[#1a1a28] text-gray-400 flex flex-col p-6">
      {/* User info */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-white text-3xl mb-2">
          {name.charAt(0).toUpperCase()}
        </div>
        <p className="text-white font-semibold">Welcom, {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
</p>
      </div>

      {/* Navigation links */}
      <ul className="flex-1 space-y-3">
        {sidebarIcons.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive ? "bg-purple-700 text-white" : "hover:bg-gray-700"
                }`
              }
            >
              <span>{NavIcons[item.icon]}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
