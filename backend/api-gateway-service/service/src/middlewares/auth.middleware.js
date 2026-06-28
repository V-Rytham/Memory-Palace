import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from "../utils/tokens.js";

const publicAuthRoutes = new Set([
  "POST /signup",
  "POST /register",
  "POST /signin",
  "POST /login",
  "POST /refresh",
  "POST /logout",
  "POST /signout",
]);

const getRouteKey = (req) => `${req.method.toUpperCase()} ${req.path}`;

export const isPublicAuthRoute = (req) => publicAuthRoutes.has(getRouteKey(req));

export const authenticateRequest =
  ({ isPublicRoute = () => false } = {}) =>
  (req, res, next) => {
    delete req.headers["x-user-id"];

    if (req.method === "OPTIONS" || isPublicRoute(req)) {
      return next();
    }

    const token = getAccessTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    try {
      const decoded = verifyAccessToken(token);
      req.authenticatedUser = decoded;
      req.authenticatedUserId = decoded.id;
      req.headers["x-user-id"] = decoded.id;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Session expired or invalid",
      });
    }
  };
