import {React, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

//importing components
import Home from './Components/home page/Home';



const App = () => {

  useEffect(()=> {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  })
  return (
   <div >
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
   </div>
  )
}

export default App