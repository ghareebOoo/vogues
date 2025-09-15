"use client"
import React, { useMemo } from 'react'
import { DummyProducts } from "../../../types"
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Image from 'next/image'
import Link from 'next/link'
import OurHeading from '../../../components/OurHeading'

export default function RelatedProducts({ relatedProducts }: { relatedProducts: DummyProducts[] }) {
  const slides = useMemo(() => {
    if (!relatedProducts || relatedProducts.length === 0) return []
    
    return relatedProducts.map((product, index) => (
      <SwiperSlide key={product.id}>
        <div className="group">
          <div
            className={`${
              ["Coconut Body Oil", "Almond Body Oil", "Lavender Body Oil"].includes(product.title)
                ? "bg-[#F2F2F2]"
                : "bg-[#F6F9F6]"
            } rounded-md relative z-10`}
          >
            <Image
              src={index === 1 && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.title}
              width={200}
              height={200}
              className="mx-auto"
            />
            <div className="absolute top-2 right-2 bg-white border-[1px] border-gray-50 px-6 rounded-full">
              {product.type}
            </div>
            <Link
              href={`/collection/${product.id}`}
              className="cursor-pointer absolute bottom-2 bg-pp w-[95%] left-[50%] translate-x-[-50%] rounded-full text-white text-base font-semibold text-center py-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
              Quick View
            </Link>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black">{product.title}</h2>
            <span className='text-gray-50 font-semibold text-[14px]'>${Object.values(product.price)[0].toFixed(2)}</span>
          </div>
          <p className="mt-2 text-gray-50 font-semibold text-[14px] line-clamp-2">
            {product.description}
          </p>
        </div>
      </SwiperSlide>
    ))
  }, [relatedProducts])

  if (!slides.length) return null 

  return (
    <div>
      <OurHeading
        leftHead="Related "
        rightHead="Products"
        desc="Explore our collection of stylish clothing and footwear made for comfort, quality, and everyday confidence."
      />
      <div className="mt-8">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {slides}
        </Swiper>
      </div>
    </div>
  )
}
