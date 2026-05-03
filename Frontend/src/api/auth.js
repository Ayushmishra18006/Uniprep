import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true, // needed for cookies
});

// register
export const registerUser = (data) => API.post("/register", data);

// login
export const loginUser = (data) => API.post("/login", data);

// get current user
export const getMe = () => API.get("/get-me");

// logout
export const logoutUser = () => API.post("/logout");