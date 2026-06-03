import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/messages",
  withCredentials: true,
});

export const getMessages = (channel) =>
  API.get(`/${channel}`);