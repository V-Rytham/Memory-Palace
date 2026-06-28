import mongoose from "mongoose";

import allowedTags from "../memoryCreationEngine/allowedTags.js";
import allowedCategories from "../memoryCreationEngine/allowedCategories.js";


const memorySchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


    rawText: {
        type: String,
        required: true
    },


    summary: {
        type: String,
        required: true
    },


    tags: [
        {
            type: String,
            enum: allowedTags
        }
    ],


    category: {
        type: String,
        enum: allowedCategories,
        required: true
    },


    entities: [
        {
            name: {
                type: String
            },

            type: {
                type: String
            }
        }
    ],


    vector: {
        type: [Number],
        required: true
    }


}, {
    timestamps: true
});


const Memory = mongoose.model("Memory", memorySchema);


export default Memory;