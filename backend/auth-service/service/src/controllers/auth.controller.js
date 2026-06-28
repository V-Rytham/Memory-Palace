import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { authCookieOptions, clearAuthCookieOptions } from "../utils/cookies.js";
import { createError, sendSuccess } from "../utils/api.js";
import redisClient from "../config/redis.js";
import env from "../config/env.js";
import {
  generateAccessToken,
  generateRefreshToken,
  getAccessTokenFromRequest,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/tokens.js";

const sanitizeUser = (user) => ({
  id: user._id,
  username: user.username,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const validateCredentials = ({ username, password }) => {
  const normalizedUsername = username?.trim();

  if (!normalizedUsername || !password) {
    throw createError(400, "Username and password are required");
  }

  if (normalizedUsername.length < 3 || normalizedUsername.length > 30) {
    throw createError(400, "Username must be between 3 and 30 characters");
  }

  if (password.length < 8) {
    throw createError(400, "Password must be at least 8 characters long");
  }

  return {
    username: normalizedUsername,
    password,
  };
};

const getRefreshTokenKey = (userId) => `refresh_token:${userId}`;

const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("token", accessToken, authCookieOptions);
};

const issueTokens = async (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  await redisClient.set(getRefreshTokenKey(userId), refreshToken, {
    EX: env.refreshTokenTtlSeconds,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const getUserIdFromLogoutRequest = (req) => {
  const accessToken = getAccessTokenFromRequest(req);

  if (accessToken) {
    try {
      return verifyAccessToken(accessToken).id;
    } catch (error) {
    }
  }

  const refreshToken = req.body?.refreshToken?.trim();

  if (refreshToken) {
    try {
      return verifyRefreshToken(refreshToken).id;
    } catch (error) {
    }
  }

  return null;
};

export const signup = async (req, res) => {
  const { username, password } = validateCredentials(req.body);

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw createError(409, "Username is already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    username,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = await issueTokens(user._id);
  setAccessTokenCookie(res, accessToken);

  sendSuccess(res, 201, "Account created successfully", {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  });
};

export const signin = async (req, res) => {
  const { username, password } = validateCredentials(req.body);

  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    throw createError(401, "Invalid username or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw createError(401, "Invalid username or password");
  }

  const { accessToken, refreshToken } = await issueTokens(user._id);
  setAccessTokenCookie(res, accessToken);

  sendSuccess(res, 200, "Signed in successfully", {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  });
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.body?.refreshToken?.trim();

  if (!refreshToken) {
    throw createError(400, "Refresh token is required");
  }

  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw createError(401, "Refresh token is invalid or expired");
  }

  const storedToken = await redisClient.get(getRefreshTokenKey(decoded.id));

  if (!storedToken || storedToken !== refreshToken) {
    throw createError(401, "Refresh token is invalid or expired");
  }

  const accessToken = generateAccessToken(decoded.id);
  setAccessTokenCookie(res, accessToken);

  sendSuccess(res, 200, "Access token refreshed successfully", {
    accessToken,
  });
};

export const logout = async (req, res) => {
  const userId = getUserIdFromLogoutRequest(req);

  if (userId) {
    await redisClient.del(getRefreshTokenKey(userId));
  }

  res.clearCookie("token", clearAuthCookieOptions);
  sendSuccess(res, 200, "Logged out successfully");
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.clearCookie("token", clearAuthCookieOptions);
    throw createError(401, "Session is no longer valid");
  }

  sendSuccess(res, 200, "Current user fetched successfully", {
    user: sanitizeUser(user),
  });
};
