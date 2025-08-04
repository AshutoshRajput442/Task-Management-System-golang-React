import axios from 'axios';

// Set base URL
const API = axios.create({
  baseURL: 'http://localhost:8080',
});

// Signup: POST /signup
export const signup = (name, email, password) =>
  API.post('/signup', { name, email, password });

// Login: POST /login
export const login = (email, password) =>
  API.post('/login', { email, password });




// // Get User Profile: GET /me
// export const getUserProfile = (token) =>
//   API.get("/me", {
//     headers: {
//       Authorization: token,
//     },
//   });


// // Create Task: POST /task
// export const createTask = (taskData, token) => {
//   return API.post("/task", taskData, {
//     headers: {
//       Authorization: token,
//       "Content-Type": "application/json",
//     },
//   });
// };