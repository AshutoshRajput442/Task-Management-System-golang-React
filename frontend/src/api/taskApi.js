import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // Change if needed
});

// export const createTask = (taskData, token) => {
//   return API.post("/task", taskData, {
//     headers: {
//       Authorization: token,
//       "Content-Type": "application/json",
//     },
//   });
// };

export const createTask = (taskData, token) => {
  return API.post("/task", taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// export const getTasks = (token) =>
//   API.get("/tasks", {
//     headers: { Authorization: token },
//   });

export const getTasks = (token) =>
  API.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });