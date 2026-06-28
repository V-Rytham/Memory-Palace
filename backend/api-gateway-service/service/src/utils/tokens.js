import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const getAccessTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }

  return req.cookies?.token;
};

export const verifyAccessToken = (token) =>
  jwt.verify(token, env.jwtAccessSecret);
