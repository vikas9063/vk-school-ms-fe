import React, { useState } from 'react'
import AuthSidebar from './AuthSidebar'
import { Outlet } from 'react-router'
import { RiMenuLine } from 'react-icons/ri'
import { Drawer, DrawerHeader, DrawerItems } from 'flowbite-react'

const AuthLayout = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    return (
        <section className='flex gap-1 min-h-screen bg-violet-50 w-full'>
            <div className="left w-[300px] bg-violet-700 h-screen hidden lg:block fixed" >
                <AuthSidebar />
            </div>
            <div className="right w-full lg:ml-[300px]">
                <div className="navb h-16 w-full flex items-center justify-between px-[3%] bg-violet-100 ">
                    <div className='lg:hidden text-violet-800'>
                        <RiMenuLine size={25} onClick={() => setIsOpen(true)} />
                    </div>
                </div>
                <main className='m-3'>
                    <Outlet />
                </main>
                <div className='bg-violet-700'>
                    <Drawer open={isOpen} onClose={handleClose} className='bg-violet-700 text-white'>
                        <DrawerHeader title="School Arc" />
                        <DrawerItems className=''>
                            <AuthSidebar />
                        </DrawerItems>
                    </Drawer>
                </div>
            </div>
        </section>
    )
}

export default AuthLayout