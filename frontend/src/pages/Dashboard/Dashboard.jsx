import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* No Dashboard cards here */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
