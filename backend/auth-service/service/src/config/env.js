import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const envFilePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.env"
);

dotenv.config({ path: envFilePath });

const getOptionalEnv = (variableName) => {
  const value = process.env[variableName];

  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue === "" ? undefined : trimmedValue;
};

const parseDurationToSeconds = (value, variableName) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }

  const normalizedValue = String(value).trim();

  if (/^\d+$/.test(normalizedValue)) {
    return Number(normalizedValue);
  }

  const match = normalizedValue.match(/^(\d+)([smhd])$/i);

  if (!match) {
    throw new Error(
      `${variableName} must be a number of seconds or use s, m, h, or d suffixes`
    );
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  const unitToSeconds = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  };

  return amount * unitToSeconds[unit];
};

const requiredVariables = [
  "MONGODB_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "REDIS_HOST",
  "REDIS_PORT",
];

for (const variableName of requiredVariables) {
  if (!process.env[variableName]) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
}

const isProduction = process.env.NODE_ENV === "production";
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || "15m";
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || "7d";

const env = {
  port: Number(process.env.PORT) || 8000,
  mongoUri: process.env.MONGODB_URI,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenExpiry,
  refreshTokenExpiry,
  accessTokenMaxAgeMs:
    parseDurationToSeconds(accessTokenExpiry, "ACCESS_TOKEN_EXPIRY") * 1000,
  refreshTokenTtlSeconds: parseDurationToSeconds(
    refreshTokenExpiry,
    "REFRESH_TOKEN_EXPIRY"
  ),
  redisHost: process.env.REDIS_HOST,
  redisPort: Number(process.env.REDIS_PORT),
  redisPassword: getOptionalEnv("REDIS_PASSWORD"),
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  isProduction,
  cookieSecure: process.env.COOKIE_SECURE === "true" || isProduction,
  cookieSameSite:
    process.env.COOKIE_SAME_SITE || (isProduction ? "none" : "lax"),
};

export default env;
