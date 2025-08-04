import React from "react";
// import { Outlet } from "react-router-dom";
import Sidebar from './../components/SideBarCompo/Sidebar';


const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* <div className="flex-1 p-4 bg-pink-500">
        <Outlet /> 
      </div> */}
    </div>
  );
};

export default AppLayout;
