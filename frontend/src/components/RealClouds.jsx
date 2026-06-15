import { motion } from "framer-motion";



export default function RealClouds({front=false}){


const clouds = [

{
x:10,
y:30,
size:400
},

{
x:35,
y:10,
size:500
},

{
x:60,
y:35,
size:450
},

{
x:80,
y:15,
size:350
},

{
x:20,
y:55,
size:550
}

];



return (

<motion.div

className="
absolute
inset-0
overflow-hidden
pointer-events-none
"


animate={{

x: front ? ["8%","-8%","8%"] : ["-5%","5%","-5%"]

}}


transition={{

duration: front?45:70,

repeat:Infinity,

ease:"linear"

}}

>


{


clouds.map((c,i)=>(


<motion.div

key={i}

animate={{

scale:[1,1.1,1],

opacity: front

?

[0.35,0.55,0.35]

:

[0.2,0.4,0.2]

}}


transition={{

duration:12+i*3,

repeat:Infinity

}}


className="

absolute

rounded-full

bg-[#c8d8df]

blur-[80px]

mix-blend-screen

"


style={{


width:c.size,

height:c.size/2,


left:`${c.x}%`,

top:`${c.y}%`


}}


/>


))


}


</motion.div>

)


}