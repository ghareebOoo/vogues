"use client"
import React, { useEffect, useMemo, useState } from 'react'
import logo from "../public/src/assets/logo.svg"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { supabase } from '../src/supabase-clients'
import myPhoto from "../public/src/assets/user.jpg"
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useCart } from '@/context/CartContext'
import { User } from '@supabase/supabase-js';

export default function Header() {
    

    const links = useMemo(()=>(
        [
            {
                label: "Home",
                href: "/"
            },
            {
                label: "Collection",
                href: "/collection"
            },
            {
                label: "Blog",
                href: "/blog"
            },
            {
                label: "Contact",
                href: "/contact"
            },
        ]
    ),[])

    const pathName = usePathname()

    const [user, setUser] = useState<User | null>();

    const [showNav , setShowNav] = useState(false)

    const {cart , readyCart} = useCart()

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession()
            if (error) {
                console.error("getSessionError:", error.message)
            }
            setUser(data.session?.user ?? null)
        }

        getSession()

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])




    const logOut = async ()=>{
        const {error:logOutError} = await supabase.auth.signOut()
        if(logOutError){
            console.error("logOutError:" , logOutError);
            return;
        }
    }
  return (
    <div className='px-4 md:px-12 py-6'>
        <div className='w-full flex items-center justify-between gap-4'>

            <div className='flex items-end'>
                <Image src={logo} alt='logo'  width={60} height={60} />
                <h1 className='hidden md:block text-xl font-bold'>ogues</h1>
            </div>

            {/* DESKTOP */}
            <div className='bg-pp/10 rounded-full px-3 py-2 hidden lg:flex items-center gap-8'>
                {links.map((link , index)=>{
                    return <Link className={`${pathName === link.href ? "bg-pp px-4 py-2 rounded-full text-white" : ""} text-lg text-black font-semibold w-fit`} key={index} href={link.href}>{link.label}</Link>
                })}
            </div>

            {/* MOBILE */}

            <div className={` ${showNav ? "h-[300px]" : "h-0"} overflow-hidden lg:hidden bg-white shadow-md rounded-md w-[220px] fixed z-50 top-20 right-4 md:right-12 transition-["height"] duration-700`}>
                <div className='h-full flex flex-col items-start justify-center gap-8'>
                    {links.map((link , index)=>{
                        return <Link onClick={()=>setShowNav(false)} className={`${pathName === link.href ? "bg-pp px-4 py-2 rounded-full text-white" : ""} ml-5 text-lg text-black font-semibold w-fit`} key={index} href={link.href}>{link.label}</Link>
                    })}
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <div onClick={()=> setShowNav(!showNav)} className='lg:hidden cursor-pointer'>
                    {showNav ?<IoMdClose className='text-2xl'/> : <FaBars className='text-2xl'/>}
                    
                </div>
                {readyCart ?
                <Link href={"/cart"} className='relative cursor-pointer'>
                    <MdOutlineAddShoppingCart className='text-2xl'/>
                     <span className='absolute -top-9 text-base text-black bg-pp/10 w-8 h-8 rounded-full flex items-center justify-center'>{cart.reduce((acc, cur)=> acc + cur.quantity , 0)}</span> 
                </Link> : <div>Loading...</div>}
                {!user ?   <Link href={"/auth"} className="bg-pp flex items-center justify-center gap-2 text-white text-base font-medium rounded-full py-3 px-4">
                    Login
                    <CiUser className='text-2xl'/>
                </Link> : <button onClick={logOut} className="cursor-pointer bg-pp flex items-center justify-center gap-2 text-white text-base font-medium rounded-full py-2 px-4">
                    LogOut
                    <Image src={myPhoto} alt='image' width={40} height={40} className='w-[40px] h-[40px] rounded-full'/>
                </button>}
              
            </div>

        </div>
    </div>
  )
}
