import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import { connectRedis } from "./config/redis.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Auth service is running",
  });
});

app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Auth service running...");
});
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  connectRedis().catch((error) => {
    console.warn(`Redis startup continuing without cache: ${error.message}`);
  });

  app.listen(env.port, () => {
    console.log(`Auth service listening on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start auth service:", error);
  process.exit(1);
});
