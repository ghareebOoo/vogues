import React from 'react'
import logo from "../public/src/assets/logo.png"
import Image from 'next/image'
import facebook from "../public/src/assets/facebook.svg"
import instagram from "../public/src/assets/instagram.svg"
import twitter from "../public/src/assets/twitter.svg"
import linkedin from "../public/src/assets/linkedin.svg"
export default function Footer() {

  return (
    <>
       <div className='bg-primary px-4 md:px-8 py-12'>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-13 gap-16'>

            <div className="w-full xl:col-span-4">
               <div className='flex items-end'>
                    <Image src={logo} alt='logo'  width={60} height={60} />
                    <h1 className='hidden md:block text-xl font-bold'>ogues</h1>
                </div>
                <p className='mt-5 text-[14px] font-medium text-gray-50'>Discover premium beauty with our cosmetic collection, crafted to enhance your natural glow, boost confidence, and deliver flawless elegance every day.</p>
                <div className='mt-3 flex items-center gap-2'>
                    <Image src={facebook} alt='logo' width={32} height={32} className='w-8'/>
                    <Image src={instagram} alt='logo' width={32} height={32} className='w-8'/>
                    <Image src={twitter} alt='logo' width={32} height={32} className='w-8'/>
                    <Image src={linkedin} alt='logo' width={32} height={32} className='w-8'/>
                </div>
            </div>

            <div className="w-full xl:col-span-3">
                <h2 className='text-xl font-bold uppercase'>Company</h2>
                <div className='mt-3 flex flex-col gap-3'>
                    <p className='text-[14px] text-gray-50 font-normal'>About</p>
                    <p className='text-[14px] text-gray-50 font-normal'>Careers</p>
                    <p className='text-[14px] text-gray-50 font-normal'>Press</p>
                    <p className='text-[14px] text-gray-50 font-normal'>Blog</p>
                    <p className='text-[14px] text-gray-50 font-normal'>Partners</p>
                </div>
            </div>

            <div className="w-full xl:col-span-3">
                <h2 className='text-xl font-bold uppercase'>Support</h2>
                <div className='mt-3 flex flex-col gap-3'>
                    <p className='text-[14px] text-gray-50 font-normal'>Help Center</p>
                    <p className='text-[14px] text-gray-50 font-normal'>Safety Information</p>
                    <p className='text-[14px] text-gray-50 font-normal'>Cancellation Options</p>
                    <p className='text-[14px] text-gray-50 font-normal'>Contact Us</p>
                    <p className='text-[14px] text-gray-50 font-normal'>Accessibility</p>
                </div>
            </div>

            <div className="w-full xl:col-span-3">
                <h2 className='text-xl font-bold uppercase'>Stay Updated</h2>
                <p className='mt-3 text-[14px] md:text-base font-medium text-gray-50'>Subscribe to our newsletter for inspiration and special offers.</p>
                <form className='w-full mt-5 relative'>
                    <input type='email' className='outline-none w-full bg-gray-200 border-[1px] border-gray-50 py-2.5 px-2 rounded-full' placeholder='Enter Your Email...' />
                    <button className='bg-[#000000cc] px-2 py-1.5 text-white font-medium cursor-pointer absolute right-2 top-[50%] translate-y-[-50%] rounded-full'>Subscribe</button>
                </form>
            </div>

        </div>

        <div className='mt-10 w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-2'>
            <p className='text-[14px] md:text-base text-gray-50 font-medium'>© 2025 Vogues. All rights reserved.</p>
            <div className='flex items-center gap-4'>
                <p className='text-[14px] md:text-base text-gray-50 font-medium'>Privacy</p>
                <p className='text-[14px] md:text-base text-gray-50 font-medium'>Terms</p>
                <p className='text-[14px] md:text-base text-gray-50 font-medium'>Sitemap</p>                
            </div>
        </div>

    </div>
    </>
 
   
  )
}
