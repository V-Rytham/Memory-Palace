import groq from "../config/groq.js";


const generateAnswer = async ({query, context})=>{


    const response =
        await groq.chat.completions.create({


            model:"llama-3.3-70b-versatile",


            temperature:0.3,


            messages:[

                {
                    role:"system",

                    content:
                    `
You are Memory Palace, an AI assistant with access to user's stored memories.

Rules:

- Answer using the provided memories.
- Do not invent personal information.
- If memories don't contain the answer, say you don't remember.
- Speak naturally, not like reading a database.

Available memories:

${context}
                    `
                },


                {
                    role:"user",
                    content:query
                }


            ]

        });



    return response
        .choices[0]
        .message
        .content;


};


export default generateAnswer;