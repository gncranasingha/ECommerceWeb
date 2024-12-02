import React from 'react'
import { Outlet } from 'react-router-dom'
import Adminsidebar from './sidebar'
import Adminheader from './header'

const Adminlayout = () => {
  return (
    <div className='flex min-h-screen w-full' >
        {/* Admin sidebar */}
        <Adminsidebar/>
        <div className='flex flex-1 flex-col' >
            {/* admin header */}
            <Adminheader/>
            <main className='flex-1 flex bg-muted/40 p-4 md:p-6' >
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default Adminlayout