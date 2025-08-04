// src/pages/AllTasks.jsx
import React, { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import TaskList from "./TaskList/TaskList";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      const res = await getTasks(token);
      setTasks(res.data);
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default AllTasks;
