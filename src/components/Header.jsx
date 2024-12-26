import React, { useEffect, useState } from 'react'
import icon from '../assets/user.png'
import logo from '../assets/cut.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FaToggleOff } from "react-icons/fa6";
import { IoToggle } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../contants/Navigation';



const Header = ({theme,toggletheme}) => {
    const location=useLocation();
    const removespace=location?.search?.slice(3)?.split("%20")?.join(" ");
    const [searchterm,setSearchTerm]=useState(removespace);
    const navigate=useNavigate();
    useEffect(()=>{
        if(searchterm){
            navigate(`/search?q=${searchterm}`)
        }
    },[searchterm])

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

  return (
    <header className='fixed top-0 w-full bg-black/60 h-16 bg-opacity-50 z-40'>
        <div className='container mx-auto px-4 flex items-center h-full gap-1'>
            <div className=''>
                <Link to="/">
                <img src={logo} alt="logo" width={85} className='bg-inherit'/>
                </Link>
            </div>
            <nav className=' hidden lg:flex justify-center items-center gap-3 text-neutral-400 font-semibold text-lg'
            >
            {
                    navigation.map((n,index)=>(
                        
                           <NavLink to={n.href} key={n.label} className={({isActive})=>`px-4 hover:text-neutral-200 ${isActive && "text-neutral-200"}`}
                           >
                            {n.label}
                           </NavLink>
                      
                    )
                )}
            </nav>
            <div className='ml-auto flex items-center gap-7'>
                <form className='flex items-center gap-4 ' onSubmit={handleSubmit}>
                    <input type="text"
                    placeholder='Search here...' 
                    className='bg-transparent px-4 py-1 outline-none border-none  hidden lg:block'
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    />
                    <button className='text-xl text-white'><IoSearchOutline/></button>
                </form>
                <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-75 transition-all'>
                    <img src={icon} alt="user" className='w-full h-full' />
                </div>
                <button className='text-3xl transition-all hover:scale-110'
                onClick={toggletheme}
                >
                    {
                        theme==="light"? <FaToggleOff/> : <IoToggle/>
                    }
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header
