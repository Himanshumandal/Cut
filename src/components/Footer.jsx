import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-45 text-neutral-300 py-3 lg:py-5 '>
      <div className='flex  items-center justify-center gap-4 mb-2  '>
         <Link to="/" className='hover:text-white transition-all hover:scale-105' >About</Link>
         <Link to="/" className='hover:text-white transition-all hover:scale-105'>Contact</Link>
      </div>
      <p className='text-md font-bold text-white/50 capitalize'>Created by Him21</p>
    </footer>
  )
}

export default Footer
