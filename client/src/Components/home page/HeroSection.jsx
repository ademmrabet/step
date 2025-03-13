import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import './homepage.css'
const HeroSection = () => {

    const [mousePosition, setMousePosition] = useState({
        x:0,
        y:0
    })
    const [cursorVariant, setCursorVariant] = useState("default")
    const[isHovered, setIsHovered] = useState(false);

    //define location of mouse

    useEffect(() => {
        const mouseMove = e => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            })
        }
        window.addEventListener('mousemove', mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove)
        }
    })

    const variants = {
        default:{
            x: mousePosition.x - 25,
            y: mousePosition.y - 25
        }
    }

    const size =  isHovered ? "400" : "50";
    
  return (
    <div className=' h-screen m-0 bg-black'>
        <div className='h-full flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center font-Bagel font-extrabold text-[150px] text-white cursor-none p-[25px]'>
                <motion.div 
                    className='mask'
                    animate={{
                        webkitMaskPosition:`${mousePosition.x - size / 2}px ${mousePosition.y - size / 2}px`,
                        WebkitMaskSize: `${size}px`,
                    }}
                    transition={{
                        ease:"backOut", 
                        duration:0.4
                    }}
                    >
                    <h1
                    onMouseEnter={()=> setIsHovered(true)}
                    onMouseLeave={()=> setIsHovered(false)}
                    >Step Up<br/>your Style</h1>
                </motion.div>
                <div className='normal'>
                    <h1>Step<br/>Footwear</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection