import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/**
 * Connected the backend to port 3000
 */
const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.json("You are currently in the home page of the app!");
});

app.listen(PORT, () =>
  console.log(`Server is currently running in the PORT ${PORT}`)
);
