// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";

// ROUTES
import authRoutes from "./routes/auth.js";
import servicesRoutes from "./routes/services.js";
import messagesRoutes from "./routes/messages.js";

// ENV
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || true,
  credentials: true,
}));

// JSON BODY
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const time = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${time}ms`);
  });
  next();
});

// Health API
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
  });
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/messages", messagesRoutes);

let isDbConnected = false;

async function ensureDbConnection() {
  if (isDbConnected) return;
  await connectDB();
  isDbConnected = true;
}

export default async function handler(req, res) {
  try {
    await ensureDbConnection();
    return app(req, res);
  } catch (error) {
    console.error("Request handling error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal server error",
        message: process.env.NODE_ENV === "development" ? String(error) : undefined,
      });
    }
  }
}
