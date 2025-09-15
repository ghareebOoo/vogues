import React from 'react'
type props = {
    leftHead: string;
    rightHead: string;
    desc: string;
}
export default function OurHeading({leftHead , rightHead , desc}:props) {
  return (
    <div>
        <h2 className='relative before:absolute before:w-[100px] before:h-[4px] before:bottom-[-5px] before:bg-gradient-to-r before:from-pp before:to-[#DDD9FF] text-2xl font-bold text-black'>{leftHead} <span className='font-normal'>{rightHead}</span></h2>
        <p className='mt-3 leading-none text-gray-50 text-[14px] font-medium max-w-[390px]'>{desc}</p>
    </div>
  )
}
