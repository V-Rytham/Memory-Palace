import chat from "./chatToGroq.js";
import createEmbedding from "./createEmbedding.js";

import Memory from "../models/memory.model.js";
import mongoose from "mongoose";


const createAndStoreMemory = async (user_id, raw_text) => {
    try {

        const meta_data = await chat(raw_text);


        if(!meta_data){
            throw new Error("Memory extraction failed");
        }


        const {vector} = await createEmbedding(
            {
                meta_data,
                raw_text,
            }
        );
        // console.log(`----------------- ${vector} -------------------`);


        const memory = await Memory.create({

            user: new mongoose.Types.ObjectId(user_id),

            rawText: raw_text,

            summary: meta_data.summary,

            tags: meta_data.tags,

            category: meta_data.category,

            entities: meta_data.entities,

            vector: vector

        });


        return memory;


    } catch(error){

        console.error("Memory Creation Error:", error);

        throw error;
    }

};


export default createAndStoreMemory;