import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();
connectDB();

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

// Routes
app.get("/", (req, res) => {
  res.json({ message: "You are currently in the home page of the app!" });
});

app.use("/api/auth", authRouter);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is currently running on PORT ${PORT} ✅`)
);

export default app;