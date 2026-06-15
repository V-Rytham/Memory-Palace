import Memory from "../models/memory.model.js";
import mongoose from "mongoose";

const retrieveKDocs = async ({ queryVector, userId, k = 5 }) => {
  try {
    const memories = await Memory.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "vector",
          queryVector,
          numCandidates: 100,
          limit: k,
          filter: {
            user: new mongoose.Types.ObjectId(userId),
          },
        },
      },
      {
        $project: {
          rawText: 1,
          summary: 1,
          tags: 1,
          category: 1,
          entities: 1,
          score: {
            $meta: "vectorSearchScore",
          },
        },
      },
    ]);

    return memories;
  } catch (error) {
    throw new Error("Unable to retrieve memories right now");
  }
};

export default retrieveKDocs;
