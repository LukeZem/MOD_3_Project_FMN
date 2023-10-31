import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <Link to="/">
        <button>Camps</button>
      </Link>
      <Link to="/camps/new">  
        <button>Make A New Camp</button>
      </Link>
    </div>
  )
}

export default Navbar