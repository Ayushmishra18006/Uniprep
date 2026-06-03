import { io } from "socket.io-client";

// To connect the frontend with the socket.io server
const socket = io("http://localhost:3000", {
  withCredentials: true,
});

export default socket;