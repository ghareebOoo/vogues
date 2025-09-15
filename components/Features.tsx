import Image from 'next/image'
import React from 'react'
import featureOne from "../public/src/assets/features1.png"
import featureTwo from "../public/src/assets/features2.png"
export default function Features() {
  return (
    <div className='px-4 md:px-12 py-12'>
        <div className='grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
            <div>
                <Image src={featureOne} alt='feature-image' width={200} height={150} className='rounded-full' />
            </div>
            <div>
                <Image src={featureTwo} alt='feature-image' width={200} height={150} className='rounded-full' />
            </div>
            <div>
                <h2 className='text-xl font-semibold'>Quality Product</h2>
                <p className='mt-1 text-gray-50 font-semibold text-[14px] leading-none'>Luxury beauty products crafted with care excellence.</p>
            </div>
            <div>
                <h2 className='text-xl font-semibold'>Fast Delivery</h2>
                <p className='mt-1 text-gray-50 font-semibold text-[14px] leading-none'>Luxury beauty products crafted with care excellence.</p>
            </div>
            <div>
                <h2 className='text-xl font-semibold'>Secure Payment</h2>
                <p className='mt-1 text-gray-50 font-semibold text-[14px] leading-none'>Luxury beauty products crafted with care excellence.</p>
            </div>
        </div>
    </div>
  )
}
