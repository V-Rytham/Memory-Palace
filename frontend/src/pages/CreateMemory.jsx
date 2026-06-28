import { useState } from "react";

import { motion } from "framer-motion";

import {
    Sparkles,
    CheckCircle
} from "lucide-react";

import { palaceApi } from "../utils/apiClient";

import MemoryWizard from "../components/MemoryWizard";




export default function CreateMemory() {



    const [memory, setMemory] = useState("");

    const [loading, setLoading] = useState(false);

    const [stage, setStage] = useState("");

    const [created, setCreated] = useState(null);





    const saveMemory = async () => {


        if (!memory.trim())
            return;



        try {


            setLoading(true);

            setCreated(null);



            setStage("Reading your thoughts...");



            setTimeout(() => {

                setStage("Finding hidden connections...");

            }, 900);



            setTimeout(() => {

                setStage("Placing inside your palace...");

            }, 1800);





            const res = await palaceApi.post(

                "/palace/new-memory",

                {
                    message: memory
                }

            );



            setCreated(res.data.data.memory);

            setMemory("");



        }

        catch (e) {

            setStage("The palace could not store this memory");

        }


        finally {


            setTimeout(() => {

                setLoading(false);

                setStage("");

            }, 1500);


        }


    }





    return (

        <div className="
relative
min-h-screen
overflow-hidden
bg-[#f5efe6]
text-[#2f2923]
">







            {/* workspace surface */}

            <div
                className="
absolute
inset-0
bg-[radial-gradient(circle_at_top_left,rgba(150,124,90,.12),transparent_42%),linear-gradient(180deg,#f7f2ea_0%,#efe6d8_100%)]
"
            />

            <div
                className="
absolute
inset-0
opacity-40
bg-[linear-gradient(rgba(120,98,76,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(120,98,76,.06)_1px,transparent_1px)]
bg-[size:42px_42px]
"
            />



            {

                Array.from({ length: 26 }).map((_, i) => (


                    <motion.div

                        key={i}

                        className="
absolute
w-3
h-3
rounded-full
bg-[#d8c8b4]/70
"

                        style={{

                            left: `${Math.random() * 100}%`,

                            top: `${Math.random() * 100}%`

                        }}


                        animate={{

                            opacity: [0.2, 0.6, 0.2],

                            y: [0, -24, 0]

                        }}

                        transition={{

                            duration: 12 + Math.random() * 6,

                            repeat: Infinity

                        }}


                    />


                ))


            }










            <section className="
relative
z-10
min-h-screen
grid
grid-cols-[45%_55%]
items-center
px-24
">








                {/* WIZARD */}


                <div>


                    <MemoryWizard thinking={loading} />



                    <h1
                        className="
mt-20
font-serif
text-7xl
leading-none
"
                    >


                        Capture your

                        <br />

                        <span className="
text-[#8b6a48]
italic
">

                            next memory

                        </span>


                    </h1>



                    <p className="
mt-8
text-xl
text-[#736555]
max-w-lg
">

                        A calm workspace for storing ideas, lessons, and moments
                        in a way you can actually return to later.

                    </p>


                </div>










                {/* JOURNAL */}

                <div>


                    <textarea


                        value={memory}


                        onChange={(e) => setMemory(e.target.value)}


                        placeholder="
Write a thought...
A lesson...
A person you met...
"


                        className="
w-full
h-[360px]
resize-none
outline-none
rounded-[40px]
p-10
text-xl
border
font-serif
text-[#2f2923]
placeholder:text-[#94836f]
bg-[#fffaf4]
border-[#d8cbbb]
shadow-[0_28px_70px_rgba(74,57,39,.08)]
focus:border-[#a17d5e]
focus:ring-0
"


                    />






                    <button

                        onClick={saveMemory}

                        className="
mt-10
text-3xl
font-serif
text-[#5c4735]
hover:text-[#8b6a48]
transition
"


                    >


                        <Sparkles className="inline mr-3" />

                        Preserve Memory


                    </button>





                    {
                        loading &&


                        <motion.div

                            initial={{
                                opacity: 0
                            }}

                            animate={{
                                opacity: 1
                            }}

                            className="
mt-10
text-[#8b6a48]
tracking-[0.08em]
text-xl
"

                        >


                            {stage}


                        </motion.div>

                    }









                    {
                        created &&



                        <motion.div

                            initial={{
                                opacity: 0,
                                y: 30
                            }}

                            animate={{
                                opacity: 1,
                                y: 0
                            }}

                            className="
mt-12
rounded-[28px]
border
border-[#d7c9b8]
bg-[#fffaf4]/90
p-8
shadow-[0_18px_40px_rgba(74,57,39,.06)]
"

                        >


                            <CheckCircle className="text-[#8b6a48]" />


                            <h2 className="
text-3xl
font-serif
mt-4
">

                                Memory Preserved

                            </h2>


                            <p className="
mt-3
text-[#736555]
">

                                {created.summary}

                            </p>


                        </motion.div>


                    }



                </div>







            </section>







        </div>

    )

}
