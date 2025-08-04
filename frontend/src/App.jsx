import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AppLayout from "./MainLayoutAllFiles/AppLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

import DashboardHome from "./pages/Dashboard/DashboardHome";
import UserProfile from "./pages/UserProfile";
import AllTasks from './pages/AllTasks';
import CreateTasks from "./pages/CreateTasks";

//---------- second Project----------
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: <DashboardHome /> }, // shows cards at /dashboard
          { path: "tasks", element: <AllTasks /> }, // shows tasks at /dashboard/tasks
          // other child routes
        ],
      },
    ],
  },
  // { path: "tasks", element: <MyTasks /> },
  {
    path: "/users",
    element: <UserProfile />,
  },
   {
    path: "/create-task",
    element: <CreateTasks />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;














// Dashboard component sirf ek container ya layout ki tarah kaam karta hai jahan pe <Outlet /> lagaya hota hai.

// Jab aap URL pe /dashboard visit karte ho, toh React Router Dashboard ke andar <Outlet /> ke jagah pe DashboardHome component (jo cards dikhata hai) render karta hai.

// Aur jab aap kisi card pe click karke URL ko change karte ho jaise /dashboard/tasks, tab React Router wahi Dashboard component render karta hai, lekin <Outlet /> ke jagah pe DashboardHome nahi, balki MyTasks component dikhata hai.

// Iska matlab hai, DashboardHome (cards wali screen) sirf tab dikhegi jab URL exactly /dashboard ho.

// Aur jab URL /dashboard/tasks ya koi aur nested route ho, tab wo DashboardHome nahi dikhayega, sirf us route ka specific component (jaise MyTasks) dikhayega.

// Simple analogy:
// Dashboard ek container box hai jisme aap alag-alag chhote boxes (components) dikha sakte ho.

// Jab aap /dashboard jaoge, toh wo container box ke andar cards wala box khulega.

// Jab aap kisi card pe click karke /dashboard/tasks jaoge, toh wo container box ke andar task list wala box khulega, aur cards wala box chhup jayega.

