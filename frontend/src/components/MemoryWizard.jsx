import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";


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



{/* aura */}

<div
className="
absolute
w-72
h-72
rounded-full
bg-[#d6a84f]/20
blur-[100px]
"
/>





<div
className="
relative
w-52
h-64
rounded-t-full
bg-gradient-to-b
from-[#3a2a12]
to-black
border
border-[#d6a84f]/30
shadow-[0_0_80px_rgba(214,168,79,.3)]
flex
items-center
justify-center
"
>


{/* face */}

<motion.div

animate={{
    opacity:[.4,1,.4]
}}

transition={{
    duration:3,
    repeat:Infinity
}}

className="
w-20
h-20
rounded-full
bg-[#d6a84f]
blur-md
"
/>



<Sparkles

className="
absolute
text-[#f6d98b]
"

size={50}

/>



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
font-serif
text-[#d6a84f]
"

>

organizing memory...

</motion.div>

}


</motion.div>


)

}