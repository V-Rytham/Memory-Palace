import embeddingClient from "../config/embedding.js";


const createEmbedding = async ({ meta_data, raw_text }) => {

    try {

        const tags_string = meta_data.tags.join(" ");


        const entities_string = meta_data.entities
            .map(entity => `${entity.name} ${entity.type}`)
            .join(" ");


        const embedding_text = `
Memory:
${raw_text}

Summary:
${meta_data.summary}

Category:
${meta_data.category}

Tags:
${tags_string}

Entities:
${entities_string}
        `.trim();


        const response = await embeddingClient.featureExtraction({

            model:
            "BAAI/bge-m3",

            inputs:
            embedding_text

        });
        // console.log(response);


        return {
            embedding_text,

            vector: response
        };


    } catch(error){

        console.log(
            "Embedding Error:",
            error
        );

        throw error;

    }

};


export default createEmbedding;