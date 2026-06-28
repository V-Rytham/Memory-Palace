import embeddingClient from "../config/embedding.js";

const createQueryEmbedding = async (query) => {
    const response = await embeddingClient.featureExtraction({

        model:
        "BAAI/bge-m3",

        inputs:
        query

    });
    // console.log(response);
    return response;
}
export default createQueryEmbedding;