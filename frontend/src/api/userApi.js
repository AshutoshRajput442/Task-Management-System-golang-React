import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const getUserProfile = (token) =>
  API.get("/me", {
    headers: {
      Authorization: token,
    },
  });
