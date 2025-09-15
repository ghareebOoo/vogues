import Link from 'next/link'
import React from 'react'
import user from "../../public/src/assets/user.svg"
import mail from "../../public/src/assets/mail.svg"
import Image from 'next/image'
export default function Contact() {
  return (
    <div className='px-4 md:px-8 pt-8 pb-12 bg-primary'>
      <div className='w-full max-w-[500px] mx-auto flex flex-col justify-center items-center'>
        <span className='bg-[#000000cc] text-white w-fit px-2 py-1 rounded-full'>Contact Us</span>
        <h2 className='mt-3 text-xl md:text-2xl font-bold'>Let’s Get In Touch.</h2>
        <div className='mt-3 flex items-center justify-center flex-wrap gap-1 text-[14px] font-semibold text-gray-50'>Or just reach out manually to us at <Link href={"to:contact@nestorria.com"}><span className='text-pp transition-all duration-300 hover:underline'>hello@vogues.com</span></Link></div>
        <form className='mt-8 w-full'>
          <label>Full Name</label>
          <div className='w-full mt-2 mb-4 relative'>
            <Image src={user} alt='icon' width={30} height={30} className='absolute left-3 top-[50%] translate-y-[-50%] w-[30px]' />
            <input type='text' className='w-full bg-secondary rounded-full pl-12 py-3 outline-none border-[1px] border-gray-50' placeholder='Enter Your Full Name'/>
          </div>

          <label>Email Address</label>
          <div className='w-full mt-2 mb-4 relative'>
            <Image src={mail} alt='icon' width={30} height={30} className='absolute left-3 top-[50%] translate-y-[-50%] w-[30px]' />
            <input type='email' className='w-full bg-secondary rounded-full pl-12 py-3 outline-none border-[1px] border-gray-50' placeholder='Enter Your Email Address'/>
          </div>

          <label>Message</label>
          <div className='w-full mt-2'>
            <textarea className='w-full h-[120px] pt-4 rounded-xl bg-secondary  pl-4 outline-none border-[1px] border-gray-50' placeholder='Enter Your Message'></textarea>
          </div>

          <button type='submit' className=' mt-4 cursor-pointer py-3 w-full bg-pp text-white rounded-full font-normal'>Submit Form</button>
        </form>
      </div>
    </div>
  )
}
