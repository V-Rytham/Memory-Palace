import {
  getCurrentUser,
  signin,
  signout,
  signup,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/api.js";

const router = Router();
router.post("/signup", asyncHandler(signup));
router.post("/signin", asyncHandler(signin));
router.post("/signout", asyncHandler(signout));
router.get("/me", authenticate, asyncHandler(getCurrentUser));

export default router;
