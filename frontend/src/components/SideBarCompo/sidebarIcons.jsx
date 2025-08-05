export const sidebarIcons = [
  { label: "Dashboard", path: "/dashboard", icon: "MdDashboard" },
  { label: "Manage Users", path: "/users", icon: "FaUserFriends" },
  { label: "Create Task", path: "/create-task", icon: "FaPlus" },
  // { label: "All Tasks", path: "/tasks", icon: "FaList" },
  { label: "All Tasks", path: "/dashboard/tasks", icon: "FaList" },
  {
    label: "Notifications",
    path: "/notifications",
    icon: "IoIosNotifications",
  },
  { label: "Logout", path: "/", icon: "RiLogoutCircleFill", isLogout: true },
];
