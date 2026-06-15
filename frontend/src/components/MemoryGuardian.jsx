import { motion } from "framer-motion";

import RealClouds from "./RealClouds";


export default function MemoryGuardian({thinking}){


return (

<div className="
absolute
inset-0
overflow-hidden
bg-[#03080c]
">



{/* night sky */}

<div className="
absolute
inset-0
bg-[radial-gradient(circle_at_65%_20%,#162936,transparent_45%)]
"
/>






{/* moon */}

<div className="
absolute
right-[25%]
top-[8%]

w-32
h-32

rounded-full

bg-[#e9fbff]

shadow-[0_0_100px_40px_rgba(180,230,255,.45)]
"
/>








{/* moving back clouds */}

<motion.div

animate={{
x:["-10%","10%","-10%"]
}}

transition={{
duration:60,
repeat:Infinity,
ease:"linear"
}}

className="
absolute
top-[5%]
left-[-20%]

w-[140%]
h-[300px]

opacity-60

bg-[url('https://www.transparenttextures.com/patterns/clouds.png')]

blur-xl
"

/>


{/* distant moving clouds */}

<RealClouds/>






{/* KEEPER */}

<motion.div

initial={{
opacity:0,
y:200
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:3
}}

className="
absolute

left-1/2
top-[12%]

-translate-x-1/2

w-[620px]
h-[850px]
"

>



{/* rim glow */}

<div className="
absolute
inset-0

rounded-t-full

shadow-[0_0_80px_20px_rgba(160,230,255,.35)]
"
/>






{/* head */}

<div className="
absolute

left-1/2
-translate-x-1/2

top-0

w-[330px]
h-[400px]

rounded-[48%]

bg-[#010202]

shadow-[inset_-30px_20px_60px_rgba(100,200,255,.15)]
"
/>






{/* face darkness */}

<div className="
absolute

left-1/2
-translate-x-1/2

top-[80px]

w-[280px]
h-[250px]

rounded-full

bg-black/80
"
/>






{/* angry brow */}

<div className="
absolute

top-[150px]
left-1/2

-translate-x-1/2

w-[180px]
h-8

rounded-full

bg-black

z-20
"
/>








{/* eyes */}

<div className="
absolute

top-[165px]

left-1/2
-translate-x-1/2

flex
gap-16

z-30
">


{[1,2].map(i=>(


<motion.div

key={i}

animate={{

boxShadow: thinking

?

[
"0 0 20px #dffaff",
"0 0 80px #dffaff",
"0 0 20px #dffaff"
]

:

"0 0 40px #dffaff"

}}

transition={{
duration:2,
repeat:Infinity
}}

className="
w-16
h-4

rounded-full

bg-[#eaffff]
"

/>


))}


</div>







{/* shoulders */}

<div className="
absolute

top-[300px]

left-1/2
-translate-x-1/2

w-[900px]
h-[400px]

rounded-t-[50%]

bg-black
"
/>






{/* collar */}

<div className="
absolute

top-[250px]
left-[20px]

w-[200px]
h-[350px]

bg-black

rotate-[25deg]
"
/>


<div className="
absolute

top-[250px]
right-[20px]

w-[200px]
h-[350px]

bg-black

-rotate-[25deg]
"
/>



</motion.div>









{/* FRONT REAL FOG CLOUDS */}

<motion.div

animate={{
x:["10%","-10%","10%"]
}}

transition={{
duration:45,
repeat:Infinity,
ease:"linear"
}}

className="
absolute

bottom-[15%]
left-[-20%]

w-[150%]
h-[300px]

opacity-80

bg-[url('https://www.transparenttextures.com/patterns/clouds.png')]

blur-2xl
"

/>








{/* darkness fade */}

<div className="
absolute
bottom-0

w-full
h-[50%]

bg-gradient-to-t

from-black
via-black/80
to-transparent
"
/>



</div>

)

}