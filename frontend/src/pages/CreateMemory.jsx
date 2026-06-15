import { useState } from "react";

import { motion } from "framer-motion";

import {
    Scroll,
    Sparkles,
    CheckCircle
} from "lucide-react";


import axios from "axios";

import MemoryWizard from "../components/MemoryWizard";




export default function CreateMemory(){



const [memory,setMemory]=useState("");

const [loading,setLoading]=useState(false);

const [stage,setStage]=useState("");

const [created,setCreated]=useState(null);





const saveMemory=async()=>{


if(!memory.trim())
return;



try{


setLoading(true);

setCreated(null);



setStage("Reading your thoughts...");



setTimeout(()=>{

setStage("Finding hidden connections...");

},900);



setTimeout(()=>{

setStage("Placing inside your palace...");

},1800);





const res = await axios.post(

"https://memory-palace-6pf8.onrender.com/api/palace/new-memory",

{
message:memory
},

{
withCredentials:true
}

);



setCreated(res.data.memory);

setMemory("");



}

catch(e){

setStage("The palace could not store this memory");

}


finally{


setTimeout(()=>{

setLoading(false);

setStage("");

},1500);


}


}





return (

<div className="
relative
min-h-screen
overflow-hidden
bg-[#050402]
text-[#f5ead8]
">







{/* background universe */}

<div
className="
absolute
inset-0
bg-[radial-gradient(circle_at_center,rgba(190,140,55,.15),transparent_55%)]
"
/>



{

Array.from({length:100}).map((_,i)=>(


<motion.div

key={i}

className="
absolute
w-[2px]
h-[2px]
rounded-full
bg-yellow-200
"

style={{

left:`${Math.random()*100}%`,

top:`${Math.random()*100}%`

}}


animate={{

opacity:[0,1,0],

y:[0,-120]

}}

transition={{

duration:8+Math.random()*6,

repeat:Infinity

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


<MemoryWizard thinking={loading}/>



<h1
className="
mt-20
font-serif
text-7xl
leading-none
"
>


Give your

<br/>

<span className="
text-[#d6a84f]
italic
">

memory life

</span>


</h1>



<p className="
mt-8
text-xl
text-[#b9aa91]
max-w-lg
">

The Archivist understands your thoughts and places
them where they belong.

</p>


</div>










{/* JOURNAL */}

<div>


<textarea


value={memory}


onChange={(e)=>setMemory(e.target.value)}


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
bg-[#120d08]/70
border
border-[#d6a84f]/20
backdrop-blur-xl
font-serif
shadow-[0_0_80px_rgba(214,168,79,.12)]
"


/>






<button

onClick={saveMemory}

className="
mt-10
text-3xl
font-serif
hover:text-[#d6a84f]
transition
"


>


<Sparkles className="inline mr-3"/>

Preserve Memory


</button>





{
loading &&


<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

className="
mt-10
text-[#d6a84f]
font-serif
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
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="
mt-12
border-l
border-[#d6a84f]
pl-6
"

>


<CheckCircle/>


<h2 className="
text-3xl
font-serif
mt-4
">

Memory Preserved

</h2>


<p className="
mt-3
text-[#b9aa91]
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