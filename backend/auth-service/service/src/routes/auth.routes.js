import {
  getCurrentUser,
  refreshAccessToken,
  signin,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/api.js";

const router = Router();
router.post("/signup", asyncHandler(signup));
router.post("/register", asyncHandler(signup));
router.post("/signin", asyncHandler(signin));
router.post("/login", asyncHandler(signin));
router.post("/refresh", asyncHandler(refreshAccessToken));
router.post("/logout", asyncHandler(logout));
router.post("/signout", asyncHandler(logout));
router.get("/me", authenticate, asyncHandler(getCurrentUser));

export default router;
