import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

/**
 * Connected the backend to port 3000
 */
const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.json({ message : "You are currently in the home page of the app!" });
});

app.listen(PORT, () =>
  console.log(`Server is currently running in the PORT ${PORT} ✅`)
);

export default app;