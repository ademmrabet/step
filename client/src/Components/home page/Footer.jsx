import React, { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from 'framer-motion';
import white from '../../../Public/images/white.png'
import black from '../../../Public/images/black.png'

const Footer = ({scrollYProgress}) => {

  const y = useTransform(scrollYProgress, [0,1], [-700,0])
  const container = useRef();
    const paths = useRef([]);
    const { scrollYProgress: localScrollProgress } = useScroll({  // Rename to avoid conflict
        target: container,
        offset: ['start end', 'end end']
    })

    useEffect( () => {
        scrollYProgress.on("change", e => {
            paths.current.forEach( (path, i) => {
                path.setAttribute("startOffset", -40 + (i * 40) + (e * 40) + "%");
            })
        })
    }, [])
  return (
    <div ref={container} className="bg-black">
    <svg className="w-full mb-40" viewBox="0 0 250 90">
        <path fill="none" id="curve" d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"/>
        <text className="text-[6px] uppercase" style={{fill: "red"}}>
            {
                [...Array(3)].map((_, i) => {
                    return <textPath key={i} ref={ref => paths.current[i] = ref} startOffset={i * 40 + "%"} href="#curve">Step Up Your Style</textPath>
                })
            }
        </text>
        <img src={white} alt="white" />
    </svg>
    <Logos scrollProgress={scrollYProgress}/>
</div>
)
}

const Logos = ({scrollProgress}) => {
const y = useTransform(scrollProgress, [0, 1], [-700, 0])
return (
<div className="h-[250px] bg-white overflow-hidden">
<motion.div style={{y}} className="h-full bg-white flex items-center justify-between w-full px-12 py-3">
    <div className="flex items-center space-x-4">
      <h1>Social media</h1>
      <p></p>
    </div>
    <div className="flex justify-center">
      <img src={black} alt="white" className="w-[95px] h-[95px]"  />
    </div>
    <div className="flex items-center space-x-4">
      <h1>Other ways to contact us</h1>
    </div>
</motion.div>
</div>
  )
}

export default Footer