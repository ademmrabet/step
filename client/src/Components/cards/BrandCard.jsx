import {React,useRef} from 'react'
import { motion, useTransform, useScroll } from 'framer-motion';


const formatImagePath = (path) => {
    // Check if path is a string
    if (!path || typeof path !== 'string') {
      return ""; // Return empty string or a default image path
    }
    
    // Replace all backslashes with forward slashes
    let formattedPath = path.replace(/\\/g, '/');
    const backendUrl = 'http://localhost:5000';
    
    return `${backendUrl}/${formattedPath}`;
  };

const BrandCard = ({index,brandName, description, logoWhite,logoBlack, progress, range, targetScale, isDarkCard}) => {

    const container = useRef(null);
    const {scrollYProgress} = useScroll({
        target: container,
        offset: ['start end', 'start start']
    })

    const imageScale = useTransform(scrollYProgress, [0,1], [2, 1]);
    const scale= useTransform(progress, range, [1, targetScale]);
    const cardStyle = {
        backgroundColor: isDarkCard ? '#000' : '#fff',
        color: isDarkCard ? '#fff' : '#000'
      };
      const buttonStyle = {
        backgroundColor: isDarkCard ? '#fff' : '#000',
        color: isDarkCard ? '#000' : '#fff'
      }
      const logoColor = isDarkCard ? logoWhite : logoBlack;
  return (
    <>
    <div ref={container} className='h-screen flex items-center justify-center sticky top-0'>
        <motion.div
         className='flex flex-col relative top-[-10%] w-[800px] h-[450px] rounded-[30px] p-[50px] origin-top border shadow-lg'
         style={{
            ...cardStyle,
            scale,
            top:`calc(5vh + ${index*30}px)`,
            
            }}>
            <h2 className='text-center m-0 text-[28px]'>{brandName}</h2>
            <div className='flex h-full mt-[25px] gap-[25px]'>
                <div className='w-[40%] relative '>
                    <p className='text-[14px]'>{description}</p>
                    <button style={buttonStyle} className='w-[200px] h-[50px] rounded-[10px] mt-[20px]'>View Products</button>
                </div>
                <div className='relative w-[60%] h-full rounded-[25px] flex items-center justify-center'>
                <motion.div 
                style={{scale: imageScale}}
                className="flex items-center justify-center w-full"
                >
                    <img src={formatImagePath(logoColor)} alt='brand logo'className='w-auto h-auto max-w-full max-h-full object-contain'/>
                </motion.div>
            </div>
            </div>
        </motion.div>
    </div>
    </>
  )
}

export default BrandCard