import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <Link to="/">Camps</Link>
      <Link to="/camps/new">Make a new Camp</Link>
    </div>
  )
}

export default Navbar