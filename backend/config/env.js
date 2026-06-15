import "dotenv/config";

const requiredVariables = [
  "MONGODB_URI",
  "JWT_SECRET",
];

for (const variableName of requiredVariables) {
  if (!process.env[variableName]) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
}

const isProduction = process.env.NODE_ENV === "production";

const env = {
  port: Number(process.env.PORT) || 8000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  isProduction,
  cookieSecure:
    process.env.COOKIE_SECURE === "true" || isProduction,
  cookieSameSite:
    process.env.COOKIE_SAME_SITE || (isProduction ? "none" : "lax"),
};

export default env;
