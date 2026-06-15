import {
    Canvas,
    useFrame
} from "@react-three/fiber";


import {
    Html,
    Stars
} from "@react-three/drei";


import { useMemo, useRef } from "react";





function Core(){


const group = useRef();



useFrame(()=>{

    group.current.rotation.y += 0.002;

});




const particles = useMemo(()=>{


return Array.from(
    {
        length:250
    },
    ()=>[

        (Math.random()-0.5)*3,

        (Math.random()-0.5)*3,

        (Math.random()-0.5)*3

    ]

);


},[]);




const memories=[


["Childhood",2,0.4,0],
["Ideas",-2,-0.3,0],
["People",1.5,-1.4,0],
["Dreams",-1.4,1.3,0]


];





return (

<group ref={group}>


{/* neural cloud */}

{

particles.map((p,i)=>(


<mesh

key={i}

position={p}

>


<sphereGeometry args={[0.015,8,8]}/>


<meshStandardMaterial

color="#d8b36a"

emissive="#d8b36a"

/>


</mesh>


))

}





{/* main consciousness */}

<mesh>


<sphereGeometry args={[0.8,80,80]}/>


<meshStandardMaterial

color="#20160b"

emissive="#c7953d"

wireframe

/>


</mesh>





{/* memories */}

{


memories.map((m)=>(


<group

key={m[0]}

position={[m[1],m[2],m[3]]}

>


<mesh>


<sphereGeometry args={[0.08,32,32]}/>


<meshStandardMaterial

color="#fff1bc"

emissive="#e7bd62"

/>


</mesh>



<Html distanceFactor={8}>


<div

style={{
color:"#d8c59c",
fontFamily:"serif",
fontSize:"15px",
marginLeft:"15px"
}}

>

{m[0]}

</div>


</Html>



</group>


))


}



</group>

)

}





export default function MemoryWorld(){


return (

<Canvas

camera={{

position:[0,0,5]

}}

>


<ambientLight intensity={1}/>


<pointLight

position={[5,5,5]}

intensity={6}

/>


<Stars

count={1500}

factor={2}

/>


<Core/>



</Canvas>


)

}