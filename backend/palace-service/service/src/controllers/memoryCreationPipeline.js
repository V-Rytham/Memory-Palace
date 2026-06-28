import createAndStoreMemory from "../memoryCreationEngine/createAndStoreMemory.js";
import { createError, sendSuccess } from "../utils/api.js";

const memoryCreationPipeline = async (req, res) => {
  const message = req.body?.message?.trim();

  if (!message) {
    throw createError(400, "Memory text is required");
  }

  const memory = await createAndStoreMemory(req.userId, message);

  sendSuccess(res, 201, "Memory stored successfully", {
    memory,
  });
};

export default memoryCreationPipeline;
