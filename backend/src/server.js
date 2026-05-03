import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL?.trim().replace(/\/$/, ""),
].filter(Boolean);

console.log("Allowed origins:", allowedOrigins);

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: function (origin, callback) {
      if (process.env.NODE_ENV === "development") return callback(null, true);
      if (!origin || allowedOrigins.includes(origin.trim().replace(/\/$/, ""))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // needed for cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
