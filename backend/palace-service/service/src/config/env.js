import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const envFilePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.env"
);

dotenv.config({ path: envFilePath });

const requiredVariables = [
  "MONGODB_URI",
  "GROQ_API_KEY",
  "HF_TOKEN",
];

for (const variableName of requiredVariables) {
  if (!process.env[variableName]) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
}

const env = {
  port: Number(process.env.PORT) || 8002,
  mongoUri: process.env.MONGODB_URI,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
};

export default env;
