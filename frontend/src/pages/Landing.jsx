import {
    Library,
    Sparkles
} from "lucide-react";

import {
    motion
} from "framer-motion";

import {
    useNavigate
} from "react-router-dom";



export default function Landing(){


const navigate = useNavigate();


const memories=[

{
name:"Childhood",
x:120,
y:150
},

{
name:"Ideas",
x:550,
y:120
},

{
name:"People",
x:620,
y:420
},

{
name:"Dreams",
x:170,
y:500
},

{
name:"Learning",
x:420,
y:600
},

{
name:"Projects",
x:350,
y:70
}

];



return (

<div className="
min-h-screen
overflow-x-hidden
bg-[#050402]
text-[#f4ead7]
relative
">



{/* ambient background */}


<div className="
fixed
inset-0
bg-[radial-gradient(circle_at_70%_40%,rgba(190,140,55,.18),transparent_50%)]
"
/>




{/* MEMORY SPACE BACKGROUND */}


<div
className="
fixed
inset-0
bg-[#050402]
"
/>



{/* warm depth glow */}

<div
className="
fixed
inset-0
bg-[radial-gradient(circle_at_70%_40%,rgba(198,150,65,.18),transparent_45%)]
"
/>




{/* distant stars */}

{
Array.from({length:160}).map((_,i)=>(

<motion.div

key={i}

className="
fixed
rounded-full
bg-[#f5deb3]
"

style={{

width:
Math.random()>0.8
?
"3px"
:
"1px",

height:
Math.random()>0.8
?
"3px"
:
"1px",

left:`${Math.random()*100}%`,

top:`${Math.random()*100}%`,

opacity:
Math.random()

}}


animate={{

opacity:[
0.15,
0.8,
0.15
],

scale:[
1,
1.4,
1
]

}}


transition={{

duration:
4+Math.random()*5,

repeat:Infinity,

delay:Math.random()*4

}}

/>

))
}







{/* moving memory dust */}

{
Array.from({length:50}).map((_,i)=>(

<motion.div

key={"dust"+i}

className="
fixed
w-[2px]
h-[2px]
rounded-full
bg-[#d8b66d]
"


style={{

left:`${Math.random()*100}%`,

top:`${Math.random()*100}%`

}}



animate={{

y:[
0,
-200
],

opacity:[
0,
1,
0
]


}}


transition={{

duration:
10+Math.random()*10,

repeat:Infinity,

delay:
Math.random()*5


}}


/>

))
}







{/* bottom darkness vignette */}

<div
className="
fixed
inset-0
bg-[radial-gradient(circle,transparent_20%,#050402_90%)]
pointer-events-none
"
/>

<nav className="
relative
z-30
px-20

py-8
flex
justify-between
items-center
">


<div className="
flex
gap-3
items-center
font-serif
text-2xl
">

<Library/>

Memory Palace

</div>


<button

className="
tracking-[8px]
text-[#d7ad62]
"

>

ENTER

</button>


</nav>








{/* HERO */}


<section className="
relative
z-10
min-h-screen
grid
grid-cols-[45%_55%]
items-center
px-24
">








{/* LEFT CONTENT */}


<motion.div

initial={{
opacity:0,
x:-60
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:1
}}

>



<div className="
flex
gap-3
items-center
text-[#d7ad62]
mb-8
">

<Sparkles/>

Living memory ecosystem


</div>







<h1 className="
font-serif
text-8xl
leading-none
">


Grow

<br/>

Your

<br/>


<span className="
italic
text-[#d7ad62]
">

Second Mind

</span>


</h1>







<p className="
mt-10
text-xl
leading-relaxed
max-w-xl
text-[#b9aa91]
">


Your memories are not stored.

They evolve into a living network where
ideas, people, experiences and lessons
naturally connect.


</p>







<button

onClick={()=>navigate("/create-memory")}

className="
mt-14
text-3xl
font-serif
hover:text-[#d7ad62]
transition
"

>


Start Growing →


</button>



</motion.div>










{/* RIGHT TREE */}



<motion.div


initial={{
opacity:0,
scale:.8
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:1.5
}}


className="
relative
h-[850px]
"



>


<svg

viewBox="0 0 750 750"

className="
absolute
right-[-50px]
top-0
w-[850px]
h-[850px]
drop-shadow-[0_0_80px_rgba(214,170,98,.25)]

"


>


<defs>


<filter id="goldGlow">


<feGaussianBlur

stdDeviation="6"

/>


</filter>



</defs>







{/* branches */}

{


memories.map((m,i)=>(



<motion.line

key={i}

x1="370"

y1="370"

x2={m.x}

y2={m.y}

stroke="rgba(218,180,95,.65)"
strokeWidth="1.5"

initial={{
pathLength:0
}}

animate={{
pathLength:1
}}

transition={{
duration:2,
delay:i*.2
}}



/>


))


}







{/* center */}

<motion.circle

cx="370"

cy="370"

r="50"

fill="#caa04d"

animate={{

r:[45,60,45]

}}

transition={{

duration:5,

repeat:Infinity

}}


/>






{/* nodes */}

{


memories.map((m,i)=>(


<g key={i}>


<motion.circle

cx={m.x}

cy={m.y}

r="18"

fill="#ead18a"

animate={{

r:[15,22,15]

}}

transition={{

duration:4+i,

repeat:Infinity

}}

/>



<text

x={m.x+30}

y={m.y+8}

fontSize="22"

fill="#e8d7b5"

fontFamily="serif"

>


{m.name}


</text>



</g>


))


}




</svg>




</motion.div>






</section>









{/* NEXT SECTION */}


<section className="
relative
z-20
min-h-screen
flex
items-center
justify-center
text-center
">


<h2 className="
font-serif
text-7xl
max-w-4xl
">


Every memory becomes a place you can revisit.


</h2>



</section>





</div>

)

}