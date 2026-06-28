import groq from "../config/groq.js";
import allowedTags from "./allowedTags.js";
import allowedCategories from "./allowedCategories.js";

const chat = async (message) => {

    try {

        const response = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            temperature: 0,

            messages: [

                {
                    role: "system",
                    content: `
You are a memory extraction engine.

Your task is to analyze raw user text and convert it into structured memory data.

Extract:
1. summary:
- A short, clear summary of the memory.
- Preserve important facts.
- Remove unnecessary words.

2. tags:
- Select only relevant tags.
- Tags must strictly come from:
${JSON.stringify(allowedTags)}

3. category:
- Select exactly one category.
- Category must strictly come from:
${JSON.stringify(allowedCategories)}

4. entities:
- Extract important named entities from the text.
- Include people, places, organizations, products, technologies, dates, or important objects.

Rules:
- Do not invent information.
- If information is missing, use null or empty arrays.
- Return ONLY valid JSON.
- No markdown.
- No explanation.

JSON format:

{
    "summary": "string",
    "tags": ["tag1","tag2"],
    "category": "category",
    "entities": [
        {
            "name": "entity name",
            "type": "entity type"
        }
    ]
}
`
                },


                {
                    role: "user",
                    content: message
                }

            ]

        });


        return JSON.parse(
            response.choices[0].message.content
        );


    } catch(error){

        console.log("Groq Error:", error);
        return null;

    }

};


export default chat;