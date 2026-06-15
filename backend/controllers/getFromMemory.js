import queryPipeline from "../QueryRetrievalEngine/queryPipeline.js";
import { createError, sendSuccess } from "../utils/api.js";

const getFromMemory = async (req, res) => {
  const query = req.body?.query?.trim();

  if (!query) {
    throw createError(400, "Query is required");
  }

  const result = await queryPipeline({
    query,
    userId: req.userId,
  });

  sendSuccess(res, 200, "Retrieval successful", result);
};

export default getFromMemory;
