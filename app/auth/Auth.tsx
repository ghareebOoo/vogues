"use client"
import React, { FormEvent, useState } from 'react'
import { supabase } from "../../src/supabase-clients";
import { useRouter } from 'next/navigation';

export default function Auth() {
    

    const router = useRouter()

    const [emailRegsiter , setEmailRegsiter] = useState("")
    const [passwordRegsiter , setPasswordRegsiter] = useState("")
    const [emailLogin , setEmailLogin ] = useState("")
    const [passwordLogin  , setPasswordLogin ] = useState("")
    const [showRegister , setShowRegister] = useState(false)

    const handelRegister = async (e:FormEvent)=>{
        e.preventDefault()
        const {error: signUpError , data} = await supabase.auth.signUp({email:emailRegsiter , password:passwordRegsiter})

        if(signUpError){
            console.error("signUpError:" , signUpError.message)
        }else{
            console.log(data)
        }
    }

    const handelLogin = async (e:FormEvent)=>{
        e.preventDefault()
        const {error: signInError , data} = await supabase.auth.signInWithPassword({email:emailLogin , password:passwordLogin})

        if(signInError){
            console.error("signInError:" , signInError.message)
        }else{
            console.log(data)
            router.push("/")

        }
    }


  return (
    <div className='px-4 py-8'>

        {showRegister &&       <div>
            <h2 className='text-xl font-bold'>Register</h2>
            <form onSubmit={handelRegister} className='mt-5'>
                <input onChange={(e)=> setEmailRegsiter(e.target.value)} value={emailRegsiter} type='email' placeholder='Email...' className='w-full px-4 py-2 rounded-md border-[1px] border-gray-500'/>
                <input onChange={(e)=> setPasswordRegsiter(e.target.value)} value={passwordRegsiter} type='password' placeholder='Password...' className='mt-3 w-full px-4 py-2 rounded-md border-[1px] border-gray-500'/>
                <button type='submit' className='mt-3 w-full py-2 text-xl font-semibold cursor-pointer bg-black text-white rounded-md'>Sign Up</button>
            </form>
            <button onClick={()=>setShowRegister(false)} className='mt-3 cursor-pointer underline text-xl font-medium'>Already have an account ?</button>
        </div>}

        {!showRegister &&  <>
        <div>
            <h2 className='text-xl font-bold'>Login</h2>
            <form onSubmit={handelLogin} className='mt-5'>
                <input onChange={(e)=> setEmailLogin(e.target.value)} value={emailLogin} type='email' placeholder='Email...' className='w-full px-4 py-2 rounded-md border-[1px] border-gray-500'/>
                <input onChange={(e)=> setPasswordLogin(e.target.value)} value={passwordLogin} type='password' placeholder='Password...' className='mt-3 w-full px-4 py-2 rounded-md border-[1px] border-gray-500'/>
                <button type='submit' className='mt-3 w-full py-2 text-xl font-semibold cursor-pointer bg-black text-white rounded-md'>Sign In</button>
            </form>
            <button onClick={()=>setShowRegister(true)} className='mt-3 cursor-pointer underline text-xl font-medium'>Create account</button>
        </div>
        </>  
        }
    </div>
  )
}
