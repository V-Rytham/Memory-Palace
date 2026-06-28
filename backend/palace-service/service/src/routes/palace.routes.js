import memoryCreationPipeline from "../controllers/memoryCreationPipeline.js";
import getFromMemory from "../controllers/getFromMemory.js";
import authenticate from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { asyncHandler } from "../utils/api.js";

const router = Router();
router.post("/new-memory", authenticate, asyncHandler(memoryCreationPipeline));
router.post("/getFromMemory", authenticate, asyncHandler(getFromMemory));

export default router;
