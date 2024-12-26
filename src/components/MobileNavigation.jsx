import React from 'react'
import { mobileNavigation } from '../contants/Navigation'
import { NavLink } from 'react-router-dom'

const MobileNavigation = () => {
  return (
    <section className='lg:hidden h-14 bg-black/60 backdrop-blur-2xl bg-opacity-50 fixed z-50 bottom-0 w-full'>
      <div className='flex items-center justify-between h-full text-neutral-400 p-3'>
        {
            mobileNavigation.map((nav,index)=>(
                <NavLink key={nav.label+"mobile"} to={nav.href}
                className={({isActive})=>`px-3 flex h-full items-center flex-col justify-center ${isActive && "text-neutral-50"} gap-1 `}
                >
                    <div className='text-3xl '>{nav.icon}</div>
                    <p className='text-sm'>{nav.label}</p>
                </NavLink>
            ))
        }
      </div>
    </section>
  )
}

export default MobileNavigation
