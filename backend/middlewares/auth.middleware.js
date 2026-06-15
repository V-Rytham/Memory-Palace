import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { clearAuthCookieOptions } from "../utils/cookies.js";

const authenticate = async (req, res, next) => {
  const token = req.cookies?.token;

  console.log(`Authentication called: ${token}`)

  if (!token) {
    console.log(`Authentication failed. Token not found`)

    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.userId = decoded.id;
    console.log(`Authentication successful`)
    next();
  } catch (error) {
    res.clearCookie("token", clearAuthCookieOptions);
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid",
    });
  }
};

export default authenticate;
