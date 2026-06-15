import createQueryEmbedding from "./createQueryEmbedding.js";
import retrieveKDocs from "./retrieveKDocs.js";
import buildContext from "./buildContext.js";
import generateAnswer from "./generateAnswer.js";


const queryPipeline = async ({ query, userId }) => {
  const queryVector = await createQueryEmbedding(query);

  const memories = await retrieveKDocs({
    queryVector,
    userId,
    k: 5,
  });

  const context = buildContext(memories);

  const answer = await generateAnswer({
    query,
    context,
  });

  return {
    answer,
    memories,
  };
};

export default queryPipeline;
