import {
    Canvas,
    useFrame
} from "@react-three/fiber";

import {
    Html,
    Float,
    Stars
} from "@react-three/drei";


import {
    useRef
} from "react";





function NeuralCore(){


const group = useRef();


useFrame(()=>{

    group.current.rotation.y += 0.002;

});



const points = Array.from(
    {
        length:120
    },
    (_,i)=>({


        x:(Math.random()-.5)*3,

        y:(Math.random()-.5)*3,

        z:(Math.random()-.5)*3


    })
);




const memories = [

    ["Ideas",2,0,0],
    ["People",-2,.8,0],
    ["Dreams",1.2,-1.8,0],
    ["Lessons",-1.5,-1.5,0],
    ["Projects",0,2,0]

];





return (


<group ref={group}>


{

points.map((p,i)=>(


<mesh

key={i}

position={[
p.x,
p.y,
p.z
]}


>


<sphereGeometry args={[0.025,16,16]}/>


<meshStandardMaterial

color="#e8c879"

emissive="#b68b35"

/>


</mesh>



))


}





{


memories.map((m)=>(


<Float key={m[0]} speed={2}>


<group

position={[
m[1],
m[2],
m[3]
]}


>



<mesh>


<sphereGeometry args={[0.12,32,32]}/>


<meshStandardMaterial

color="#fff1b8"

emissive="#d4a44d"


/>


</mesh>




<Html

distanceFactor={7}

position={[.3,0,0]}

>


<div

style={{

fontFamily:"serif",

color:"#ead9b5",

fontSize:"18px",

whiteSpace:"nowrap"

}}

>


{m[0]}


</div>


</Html>



</group>


</Float>



))


}



</group>


)

}










export default function MemoryUniverse(){


return (


<Canvas

camera={{

position:[0,0,6]

}}

>


<ambientLight intensity={1}/>


<pointLight

position={[5,5,5]}

intensity={4}


/>


<Stars

count={2000}

depth={50}


/>


<NeuralCore/>


</Canvas>


)

}