// src/pages/Tasks.jsx
import React, { useEffect, useState } from "react";
import { createTask, getTasks } from "../api/taskApi";
import TaskList from "./TaskList/TaskList";

const CreateTasks = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await getTasks(token);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask  = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await createTask({ title, description: desc }, token);
    setTitle("");
    setDesc("");
    fetchTasks(); // reload tasks
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Task</h1>
      <form onSubmit={handleCreateTask } className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* Show tasks below */}
      <TaskList tasks={tasks} />
    </div>
  );
};

export default CreateTasks;




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











// import { useEffect, useState } from "react";
// import { getUserProfile } from "../api/userApi";
// import { createTask } from "../api/taskApi";
// import TaskList from './TaskList/TaskList';
// import TaskList from './TaskList/TaskList';

// const Tasks = () => {
//   const [userEmail, setUserEmail] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await getUserProfile(token);
//         setUserEmail(res.data.email);
//       } catch (err) {
//         console.error("Failed to fetch user profile", err);
//       }
//     };
//     fetchUser();
//   }, []);

  
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await getTasks(token); // your API wrapper
//         setTasks(res.data);
//       } catch (err) {
//         console.error("Failed to fetch tasks:", err);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const taskData = {
//       user_email: userEmail,
//       title,
//       description,
//       status: "pending",
//     };

//     try {
//       const res = await createTask(taskData, token);
//       const newTask = {
//         id: res.data.task_id,
//         title,
//         description,
//         status: "pending",
//         created_at: new Date().toLocaleString(),
//       };

//       setTasks([newTask, ...tasks]);
//       setTitle("");
//       setDescription("");
//       setShowForm(false);
//     } catch (err) {
//       console.error("Task creation failed", err);
//     }
//   };

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <button
//         onClick={() => setShowForm(!showForm)}
//         className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
//       >
//         + Create Task
//       </button>

//       {showForm && (
//         <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow mb-6">
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             required
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full mb-2 p-2 border rounded"
//           />
//           <textarea
//             placeholder="Description"
//             value={description}
//             required
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full mb-2 p-2 border rounded"
//           />
//           <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//             Submit
//           </button>
//         </form>
//       )}

//       <div>
//         <h2 className="text-lg font-semibold mb-2">Your Tasks</h2>
//         {tasks.map((task) => (
//           <div key={task.id} className="bg-white border rounded shadow p-4 mb-2">
//             <h3 className="font-bold">{task.title}</h3>
//             <p>{task.description}</p>
//             <p className="text-sm text-gray-600">
//               Status: {task.status} | Created: {task.created_at}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tasks;
