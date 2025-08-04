import React from "react";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
// import Dashboard from "../../pages/Dashboard/Dashboard";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex-1 flex flex-col">
      <TopBar />

      <div className="flex h-screen bg-gray-100">
        <NavBar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-gray-50 p-8 rounded shadow text-center text-gray-900 font-mono text-lg">
            {/* <Dashboard /> */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
