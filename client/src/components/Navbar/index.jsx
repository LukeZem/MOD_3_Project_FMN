import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <Link to="/">
        <button>Option 1</button>
      </Link>
      <Link to="/">
        <button>option 2</button>
      </Link>
    </div>
  )
}

export default Navbar