import { HfInference } from "@huggingface/inference";


const embeddingClient = new HfInference(
    process.env.HF_TOKEN
);


export default embeddingClient;