import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import subjectRouter from "./routes/subject.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
connectDB();

// Socket io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// CORS FIRST
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middlewares
app.use(express.json());
app.use(cookieParser());

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinChannel", (channel) => {
    socket.join(channel);
  });

  socket.on("sendMessage", (data) => {
    if (!data.text?.trim()) return;
    io.to(data.channel).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "You are currently in the home page of the app!" });
});

// Auth Router
app.use("/api/auth", authRouter);

// Subject Router
app.use("/api/subjects", subjectRouter);

// Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server is currently running on PORT ${PORT} ✅`)
);

export default app;
