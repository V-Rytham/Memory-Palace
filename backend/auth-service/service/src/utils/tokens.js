import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const getAccessTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }

  return req.cookies?.token;
};

export const generateAccessToken = (userId) =>
  jwt.sign(
    {
      id: userId,
    },
    env.jwtAccessSecret,
    {
      expiresIn: env.accessTokenExpiry,
    }
  );

export const generateRefreshToken = (userId) =>
  jwt.sign(
    {
      id: userId,
    },
    env.jwtRefreshSecret,
    {
      expiresIn: env.refreshTokenExpiry,
    }
  );

export const verifyAccessToken = (token) =>
  jwt.verify(token, env.jwtAccessSecret);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, env.jwtRefreshSecret);
