import createQueryEmbedding from "./createQueryEmbedding.js";
import retrieveKDocs from "./retrieveKDocs.js";
import queryPipeline from "./queryPipeline.js";
console.log("starting test");

const response = await createQueryEmbedding("software developer");
const res = await retrieveKDocs({queryVector: response, userId: "6a2813bffd539561ecdaacdc",k:5})


// async function test() {
//     const res = await queryPipeline({query: "Herione", userId: "6a2813bffd539561ecdaacdc"})
//     console.log(res)
//     console.log(`Test successful!`)
// }
// test();