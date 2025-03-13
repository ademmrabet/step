import {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import BrandCard from '../cards/BrandCard';
import { useScroll } from 'framer-motion';
import Lenis from '@studio-freight/lenis'


const CardsParal = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const container = useRef(null);
  const {scrollYProgress} = useScroll({
      target: container,
      offset: ['start start', 'end end']
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/brands');
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className='mt-[50vh] mb-[30vh]' ref={container}>
      {items.length > 0 ? (
        items.map((item, index) => {
          const targetScale = 1 - ((items.length - index) * 0.05);
          const isDarkCard = index % 2 === 0; 
          return <BrandCard key={item._id} index={index} {...item} progress={scrollYProgress} range={[index * 0.25, 1]} targetScale={targetScale} isDarkCard={isDarkCard} />;
        })
      ) : (
        <p>No items found</p>
      )}
    </div>
  )
}

export default CardsParal