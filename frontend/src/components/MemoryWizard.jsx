import { motion } from "framer-motion";
import { Scroll } from "lucide-react";


export default function MemoryWizard({thinking}){


return (

<motion.div

animate={{
    y:[0,-15,0]
}}

transition={{
    duration:5,
    repeat:Infinity
}}

className="
relative
flex
justify-center
items-center
"
>



{/* soft panel shadow */}

<div
className="
absolute
w-72
h-72
rounded-[40px]
bg-[#e7ddd0]
blur-[70px]
opacity-70
"
/>





<div
className="
relative
w-52
h-64
rounded-[36px]
bg-[#f7f1e8]
border
border-[#d5c6b3]
shadow-[0_24px_60px_rgba(62,45,27,.12)]
flex
items-center
justify-center
"
>


{/* stacked memory cards */}

<motion.div

animate={{
    y:[0,-5,0]
}}

transition={{
    duration:3,
    repeat:Infinity
}}

className="
absolute
w-32
h-24
rounded-[24px]
bg-[#eadfce]
border
border-[#d9c9b6]
-rotate-6
translate-y-3
"
/>


<motion.div

animate={{
    y:[0,5,0]
}}

transition={{
    duration:3.6,
    repeat:Infinity
}}

className="
absolute
w-32
h-24
rounded-[24px]
bg-[#fffaf4]
border
border-[#d8c7b1]
rotate-6
-translate-y-3
"
/>


<div

className="
relative
w-28
h-28
rounded-[28px]
bg-[#2f2923]
text-[#efe4d4]
flex
items-center
justify-center
shadow-[0_18px_40px_rgba(47,41,35,.22)]
"

>

<Scroll

className="
text-[#efe4d4]
"

size={50}

/>

</div>


</div>



{
thinking &&

<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

className="
absolute
-bottom-12
tracking-[0.22em]
uppercase
text-sm
text-[#8b7358]
"

>

organizing memory...

</motion.div>

}


</motion.div>


)

}
