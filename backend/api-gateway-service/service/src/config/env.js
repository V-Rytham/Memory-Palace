import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const envFilePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.env"
);

dotenv.config({ path: envFilePath });

const requiredVariables = [
  "AUTH_SERVICE_URL",
  "PALACE_SERVICE_URL",
  "JWT_ACCESS_SECRET",
];

for (const variableName of requiredVariables) {
  if (!process.env[variableName]) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
}

const env = {
  port: Number(process.env.PORT) || 8003,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  authServiceUrl: process.env.AUTH_SERVICE_URL,
  palaceServiceUrl: process.env.PALACE_SERVICE_URL,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
};

export default env;
