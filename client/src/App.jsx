import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CampsDisplay from './pages/CampsDisplay'
import CampForm from './pages/CampForm'
import SingleCamp from './pages/SingleCamp'
import axios from 'axios'
import { primaryContext } from './context/PrimaryProvider'


function App() {
  // go get states data, put in context

  const { setStates, setCamps } = useContext(primaryContext);

  useEffect(() => {
    // getting and setting states array on first render
    try {
      axios({
        method: "GET",
        url: "/server/states"
      }).then((response) => {
        console.log(response.data);
        setStates(response.data)
      })
    } catch (error) {
      console.error(error)
    }

    //getting and setting camps array on first render
    try {
      axios({
        method: "GET",
        url: "/server/camps"
      }).then((response) => {
        console.log(response.data);
        setCamps(response.data)
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<CampsDisplay />} />
        <Route path='/camps/new' element={<CampForm />} />
        <Route path='/camps/:campId' element={<SingleCamp />} />
      </Routes>
    </div>
  )
}

export default App
