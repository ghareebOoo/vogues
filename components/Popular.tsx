"use client"
import React, { useMemo } from 'react'
import OurHeading from './OurHeading'
import { useVOgues } from '@/context/VoguesContext';
import Image from 'next/image';
import Link from 'next/link';
import ProductCardSkeleton from './ProductCardSkeleton';
export default function Popular() {

    const {products} = useVOgues()
    const popularProducts = useMemo(() => products.filter(product => product.popular),
        [products]
    );

    const isLoading = !products || products.length === 0

  return (
    <div className='px-4 md:px-12 py-12'>
        <OurHeading leftHead='Popular' rightHead='Products' desc='Discover cosmetics that enhance beauty, deliver radiance and bring confidence to your daily routine'/>
        <div className='mt-8'></div>
        {isLoading ? (
                  <ProductCardSkeleton count={4} />) : 
            ( <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {popularProducts.map((product , index)=>{
                return <div key={index} className='group'>
                    <div className={`${["Coconut Body Oil", "Almond Body Oil", "Lavender Body Oil"].includes(product.title) ? "bg-[#F2F2F2]" : "bg-[#F6F9F6]"} rounded-md relative z-10`}>
                        <Image src={product.images[0]} alt='image' width={200} height={200} className='mx-auto' />
                            <div className="absolute top-2 right-2 bg-white border-[1px] border-gray-50 px-6 rounded-full">{product.type}</div>
                            <Link href={`/collection/${product.id}`} className="cursor-pointer absolute bottom-2 bg-pp w-[95%] left-[50%] translate-x-[-50%] rounded-full text-white text-base font-semibold text-center py-1.5 opacity-0 transition-all duration-300  group-hover:opacity-100">Quick View</Link>
                    </div>
                    <div className='mt-3 flex items-center justify-between'>
                        <h2 className='text-xl font-semibold text-black'>{product.title}</h2>
                        <span className='text-gray-50 font-semibold text-[14px]'>${Object.values(product.price)[0].toFixed(2)}</span>
                    </div>
                    <p className='mt-2 text-gray-50 font-semibold text-[14px] line-clamp-2'>{product.description}</p>
                </div>
            })}
        </div>)}
    </div>
  )
}
