import React, { useEffect, useRef } from "react";
import HeroSection from './HeroSection'
import CardsParal from './CardsParal'
import Footer from './Footer'
import { useScroll, useTransform, motion } from 'framer-motion';


const Home = () => {


  const container = useRef();
  const { scrollYProgress } = useScroll({
          target: container,
          offset: ['start end', 'end end']
      })
  return (
    <div className='p-0 m-0'>
    <HeroSection />
    <CardsParal />
    <Footer scrollYProgress={scrollYProgress}/>
    </div>
  )
}

export default Home