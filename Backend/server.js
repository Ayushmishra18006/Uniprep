import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import subjectRouter from "./routes/subject.routes.js";
import Message from "./models/message.model.js";
import messageRouter from "./routes/message.routes.js";
import courseSubjectRouter from "./routes/courseSubject.routes.js";
import resourceRouter from "./routes/resource.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import progressRoutes from "./routes/progress.routes.js";

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
    // console.log(`${socket.id} joined ${channel}`);
  });

  socket.on("sendMessage", async (data) => {
    try {
      console.log("Message received:", data);

      const savedMessage = await Message.create({
        sender: data.sender,
        text: data.text,
        channel: data.channel,
      });

      io.to(data.channel).emit("receiveMessage", savedMessage);
    } catch (error) {
      console.log(error);
    }
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

// Progress router
app.use("/api/progress", progressRoutes);

// Message Router
app.use("/api/messages", messageRouter);

app.use("/api/course-subjects", courseSubjectRouter);
app.use("/api/resources", resourceRouter);

// Dashboard route
app.use("/api/dashboard", dashboardRoutes);

// Server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () =>
  console.log(`Server is currently running on PORT ${PORT} ✅`)
);

export default app;
