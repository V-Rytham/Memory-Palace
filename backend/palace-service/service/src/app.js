import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";
import palaceRouter from "./routes/palace.routes.js";

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
    message: "Palace service is running",
  });
});

app.use("/api/palace", palaceRouter);
app.get("/", (req, res) => {
  res.send("Palace service running...");
});
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Palace service listening on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start palace service:", error);
  process.exit(1);
});
