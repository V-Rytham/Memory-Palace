import { clearAuthCookieOptions } from "../utils/cookies.js";
import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from "../utils/tokens.js";

const authenticate = (req, res, next) => {
  const token = getAccessTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.userId = decoded.id;
    req.user = decoded;
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
