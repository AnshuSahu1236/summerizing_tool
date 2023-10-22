import React from 'react'
import image from './Image.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar flex justify-between pt-5 px-20 items-start'>

        <Link to='/' className='flex items-start'>
            <img src={image} alt='logo' width={95}/>
            <span className='text-[#eb7f05] font-serif text-3xl font-semibold px-5' >Summarizing Tool</span>
        </Link>

        <Link to='https://github.com/shreyansh-35/summarizingtool' target='_blank'>
            <button className='rounded-full bg-black text-[white] text-base tracking-wide px-6 py-2'> GITHUB</button>
        </Link>
        
    </div>
  )
}

export default Navbar
