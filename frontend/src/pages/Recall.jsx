import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

import MemoryGuardian from "../components/MemoryGuardian";





export default function Recall(){


const userId = useSelector(
state => state.auth.user
);



const [query,setQuery] = useState("");

const [answer,setAnswer] = useState("");

const [memories,setMemories] = useState([]);

const [loading,setLoading] = useState(false);






const recallMemory = async()=>{


if(!query.trim())
return;



try{


setLoading(true);

setAnswer("");

setMemories([]);




const res = await axios.post(

"http://localhost:8000/api/palace/getFromMemory",

{
query,
userId
},

{
withCredentials:true
}

);




setAnswer(
res.data.data.answer
);


setMemories(
res.data.memories || []
);



}

catch(e){

console.log(e);

}

finally{

setLoading(false);

}


};










return (

<div className="
relative
min-h-screen
bg-black
text-[#e8e0cf]
overflow-x-hidden
">





{/* Keeper Scene */}

<div className="
fixed
inset-0
">

<MemoryGuardian thinking={loading}/>

</div>







<section className="
relative
z-10
min-h-screen
flex
flex-col
items-center
justify-end
pb-20
">








<motion.h1


initial={{
opacity:0,
y:40
}}


animate={{
opacity:1,
y:0
}}


transition={{
delay:1.5
}}


className="
font-serif
text-7xl
mb-10
"


>


Ask The Keeper


</motion.h1>









{/* SEARCH */}

<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:1.8
}}

className="
w-[780px]
h-20
rounded-full
bg-black/25
backdrop-blur-xl
border
border-white/10
flex
items-center
px-10
shadow-[0_0_60px_rgba(180,240,255,.08)]
"

>



<input


value={query}


onChange={(e)=>setQuery(e.target.value)}


onKeyDown={(e)=>{

if(e.key==="Enter")
recallMemory();

}}


placeholder="Reveal a forgotten memory..."


className="
flex-1
bg-transparent
outline-none
text-xl
font-serif
placeholder:text-white/30
"


/>





<button


onClick={() => {console.log(`Recall called`); recallMemory()}}


className="
flex
gap-3
items-center
tracking-[6px]
text-[#bcecff]
hover:text-white
transition
"

>

<Search size={22}/>


RECALL


</button>




</motion.div>








{/* Loading */}

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
font-serif
tracking-widest
text-[#bcecff]
animate-pulse
"


>

The Keeper is searching your palace...

</motion.div>


}









{/* RESULTS */}


{

answer &&


<motion.div


initial={{
opacity:0,
y:80
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:1
}}


className="
mt-32
w-[850px]
pb-32
"

>



<h2 className="
font-serif
text-5xl
mb-8
text-[#bcecff]
">

Recovered Memory

</h2>





<div className="
relative
rounded-[40px]
bg-black/30
border
border-white/10
backdrop-blur-xl
p-10
shadow-[0_0_80px_rgba(150,220,255,.12)]
">


<p className="
font-serif
text-2xl
leading-relaxed
text-[#f5ead8]
">

{answer}

</p>


</div>







{/* MEMORY FRAGMENTS */}


<div className="
mt-12
space-y-6
">


{

memories.map((memory,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
x:-30
}}

animate={{
opacity:1,
x:0
}}

transition={{
delay:index*.15
}}


className="
border-l
border-[#bcecff]
pl-6
text-[#b8c8c8]
font-serif
"

>


{memory.summary}


</motion.div>


))


}


</div>





</motion.div>


}






</section>




</div>


)


}