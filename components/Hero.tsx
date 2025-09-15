import React from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import hero from "../public/src/assets/hero.png"
import Image from 'next/image';

export default function Hero() {
  return (
    <div className='px-4 md:px-12 '>
        <div className='bg-hero bg-cover pl-2.5 pt-8 pb-1 rounded-md'>
            <span className='text-2xl md:text-3xl lg:text-4xl font-semibold text-black md:leading-[50px] lg:leading-[70px] block max-w-[400px]'>Enhance Your <span className='text-pp'>Look</span> With <span className='text-pp'>Glam</span> Essentials</span>
            <p className='mt-3 text-base text-gray-50 font-medium lg:max-w-[810px]'>Discover premium beauty with our cosmetic collection, crafted to enhance your natural glow, boost confidence, and deliver flawless elegance every day with trusted, affordable products.</p>
            <div className="cursor-pointer mt-6 bg-pp w-[250px] rounded-full realtive flex items-center justify-between group px-2 py-1">
                <span className='text-white text-[14px]'>Check Our Morder Collection</span>
                <div className="relative group-hover:left-5 transition-all duration-500 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <MdKeyboardDoubleArrowRight className='text-2xl text-pp'/>
                </div>
            </div>
            <div className='w-[250px] rounded-md bg-white p-2.5'>
                <Image src={hero} alt="hero-image" width={200} height={80} className='w-full rounded-md'/>
                <span className='block mt-3 text-[14px] font-medium text-gray-50 leading-none'><span className='text-pp font-bold text-base'>Unlockyour</span> best look, one click at a time, Your style upgrade starts here, shop today!</span>
            </div>
        </div>
    </div>
  )
}
