import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import axios from 'axios'
import { primaryContext } from './context/PrimaryProvider'


function App() {
  

  // const { } = useContext(primaryContext);

  useEffect(() => {
   
  }, [])

  return (
    <div id='layout'>
      <Navbar />
      <Routes>
       
      </Routes>
    </div>
  )
}

export default App
