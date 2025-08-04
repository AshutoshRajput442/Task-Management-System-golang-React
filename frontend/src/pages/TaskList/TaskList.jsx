import React from "react";

const TaskList = ({ tasks }) => {
  if (!tasks || tasks.length === 0)
    return <p className="text-gray-600 text-center mt-8">No tasks available.</p>;

  return (
    <div className="mt-6 space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between bg-white border border-gray-200 shadow-sm rounded-xl px-6 py-4 hover:shadow-md transition"
        >
          <div className="flex flex-row gap-10 w-full">
            {/* <h2 className="text-lg font-semibold text-indigo-700">{task.id}</h2> */}

            <div className="w-1/3">
              <h2 className="text-md font-semibold text-indigo-700">{task.title}</h2>
            </div>

            <div className="w-2/3">
              <p className="text-gray-600 text-sm">{task.description}</p>
            </div>

            <div className="text-xs text-gray-500 whitespace-nowrap">
              {task.created_at &&
                new Date(task.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
            </div>
          </div>

          <div>
            {/* <span
              className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                task.status === "done"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.status.toUpperCase()}
            </span> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;






// import React from "react";

// const TaskList = ({ tasks }) => {
//   if (!tasks.length)
//     return <p className="text-gray-600 text-center mt-8">No tasks available.</p>;

//   return (
//     <div className="mt-6 space-y-4">
//       {tasks.map((task) => (
//         <div
//           key={task.id}
//           className="flex items-center justify-between bg-white border border-gray-200 shadow-sm rounded-xl px-6 py-4 hover:shadow-md transition"
//         >
//           <div className="flex flex-row gap-10 w-full">
//             {/* <h2 className="text-lg font-semibold text-indigo-700">{task.id}</h2> */}
            
//             <div className="w-1/3">
//               <h2 className="text-md font-semibold text-indigo-700">{task.title}</h2>
//             </div>

//             <div className="w-2/3">
//               <p className="text-gray-600 text-sm">{task.description}</p>
//             </div>

//              <div className="text-xs text-gray-500 whitespace-nowrap">
//               {new Date(task.created_at).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
                
//               })}
//             </div>
//           </div>

//           <div>
//             {/* <span
//               className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
//                 task.status === "done"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-yellow-100 text-yellow-700"
//               }`}
//             >
//               {task.status.toUpperCase()}
//             </span> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskList;
