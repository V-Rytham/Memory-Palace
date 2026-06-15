const buildContext = (memories) => {


    if(!memories.length){

        return "No relevant memories found.";

    }


    const context = memories
        .map((memory,index)=>{


            return `
Memory ${index + 1}:

Original Memory:
${memory.rawText}

Summary:
${memory.summary}

Category:
${memory.category}

Tags:
${memory.tags.join(", ")}
`;

        })
        .join("\n----------------\n");


    return context;

};


export default buildContext;