import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { authCookieOptions, clearAuthCookieOptions } from "../utils/cookies.js";
import { createError, sendSuccess } from "../utils/api.js";

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

const issueAuthCookie = (res, userId) => {
  const token = generateToken(userId);
  res.cookie("token", token, authCookieOptions);
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

  issueAuthCookie(res, user._id);

  sendSuccess(res, 201, "Account created successfully", {
    user: sanitizeUser(user),
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

  issueAuthCookie(res, user._id);

  sendSuccess(res, 200, "Signed in successfully", {
    user: sanitizeUser(user),
  });
};

export const signout = async (req, res) => {
  res.clearCookie("token", clearAuthCookieOptions);
  sendSuccess(res, 200, "Signed out successfully");
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.userId);
  console.log(user)
  console.log(`Get currentUSer called!`)
  if (!user) {
    res.clearCookie("token", clearAuthCookieOptions);
    throw createError(401, "Session is no longer valid");
  }

  sendSuccess(res, 200, "Current user fetched successfully", {
    user: sanitizeUser(user),
  });
};
