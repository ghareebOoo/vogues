"use client"
import Image from 'next/image'
import React, { useEffect, useMemo, useState} from 'react'
import { FaHeart, FaStar, FaStarHalfAlt} from 'react-icons/fa'
import { BsCartPlus } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { GiReturnArrow } from 'react-icons/gi'
import { useVOgues } from '@/context/VoguesContext';
import RelatedProducts from './RelatedProducts';
import { useCart } from '@/context/CartContext';
import ProductDetailsSkeleton from '../ProductDetailsSkeleton';
import toast from 'react-hot-toast';
export default function ProductDetails({ id }: { id: string }) {


    const detailsData = useMemo(()=>(
        [
            {
                icon: <GiReturnArrow className='text-2xl text-yellow-400'/>,
                title: "Easy Return",
                description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eaque corrupti asperiores animi, praesentium temporibus!"
            },
  
            {
                icon: <TbTruckDelivery className='text-2xl text-red-400'/>,
                title: "Fast Delivery",
                description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eaque corrupti asperiores animi, praesentium temporibus!"
             },
            {
                icon: <RiSecurePaymentFill className='text-2xl text-blue-400'/>,
                title: "Secure Payment",
                description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eaque corrupti asperiores animi, praesentium temporibus!"
            },
        ]
    ),[])

   const [indexImage , setIndexImage] = useState(0)

   const [size , setSize] = useState("")


  const [loved , setLoved] = useState<string[]>([])

  const handelLoved = (itemId:string)=>{
    let newLoved = [...loved]
    if(newLoved.includes(itemId)){
      newLoved = newLoved.filter((item)=> item !== itemId)
    }else{
      newLoved = [...newLoved , itemId]
    }

    setLoved(newLoved)
  }

  useEffect(()=>{
    const saveLoved = localStorage.getItem("myLoved")
    if(saveLoved){
        const parsedLoved =  JSON.parse(saveLoved) as string[]
        setLoved(parsedLoved)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("myLoved" , JSON.stringify(loved))
  },[loved])


      const {products} = useVOgues()
      const {addToCart} = useCart()


    

    const productDetails = products.find((pro)=> String(pro.id) === String(id))


      if (!productDetails) {
      return <ProductDetailsSkeleton />;
    }

  

  const relatedProducts = products.filter((item)=> item.category.toLowerCase() === productDetails.category.toLowerCase() && item.id !== productDetails.id);




  

 

  return (
    <div className='px-4 md:px-12 py-12'>


      <div className='mt-8 flex flex-col xl:flex-row xl:h-[500px] xl:items-stretch gap-8'>

        <div className={`w-full xl:h-full max-w-[600px] xl:max-w-full flex ${productDetails.images.length > 1 ? "items-stretch" : "items-center"}  gap-2`}>

          <div className={`${productDetails.images.length > 1 ? "flex flex-col gap-2 justify-between xl:h-full" : ""}`}>
            {productDetails.images.slice(0 , 4).map((item , index)=>{
              return <div onClick={()=>setIndexImage(index)} key={index} className='cursor-pointer bg-primary rounded-md'>
                <Image src={item} alt='image' width={150} height={180} />
              </div>
            })}
          </div>

          <div className='xl:h-full flex-grow bg-primary rounded-md'>
            <Image src={productDetails.images[indexImage]} alt='image' width={500} height={500} className='w-full transition-all duration-300' />
          </div>

        </div>
       
        <div className='w-full bg-primary p-5 rounded-md'>

          <h2 className='text-base md:text-xl font-bold'>{productDetails.title}</h2>

   
          <div className='flex gap-2'>
            <FaStar className='text-xl text-yellow-400' />
            <FaStar className='text-xl text-yellow-400' />
            <FaStar className='text-xl text-yellow-400' />
            <FaStar className='text-xl text-yellow-400' />
            <FaStarHalfAlt className='text-xl text-yellow-400' />
            <span className='text-gray-400 text-base font-semibold'>(222)</span>
          </div>

  
          <div className='my-5 flex items-center gap-5'>
            <span className='text-2xl text-gray-500 font-bold'>
              ${productDetails.price[size]}
            </span>
          </div>
        
          <p className='text-[14px] md:text-base font-medium text-gray-400'>{productDetails.description}</p>

 
          <div className='mt-5 flex items-center gap-2'>
            {productDetails.sizes.map((si, index) => (
              <label key={index} className={`cursor-pointer px-4 py-1 rounded-md border ${size === si ? "bg-amber-300" : "bg-white"}`}>
                <input type="radio" name="size" value={si} checked={size === si} onChange={() => setSize(si)} className="appearance-none"/>
                {si}
              </label>
            ))}
          </div>

          <div className='mt-5 w-full max-w-[400px] border-b-[1px] border-gray-500 pb-4'>

            <div className='flex items-center gap-4 w-full'>

                <button disabled={!size} onClick={()=>{addToCart(productDetails.id , productDetails.images[0] , size , productDetails.title , productDetails.price[size] , 1); toast.success("Added to cart successfully")}} className={`${!size ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"} cursor-pointer flex-grow flex justify-center items-center gap-2 py-3 rounded-full`}>Add To Cart <BsCartPlus className='text-2xl text-gray-300'/></button>

                <button onClick={()=> handelLoved(String(productDetails.id))} className={`cursor-pointer py-3 px-8 bg-white border-[1px] border-gray-50 transition-all duration-500 hover:bg-gray-400 rounded-full`}><FaHeart className={`${loved.includes(String(productDetails.id)) ? "text-red-500" : ""} text-2xl`}/></button>

            </div>

            <h3 className='mt-2 whitespace-nowrap flex items-center gap-2 text-[13px] md:text-base font-normal'><TbTruckDelivery className='text-2xl'/> Free Delivery on orders over 500$</h3>

          </div>

          <div className='mt-3'>

            <p className='text-[14px] md:text-base text-gray-400 font-medium'>Authenticy You Can Trust</p>
            <p className='text-[14px] md:text-base text-gray-400 font-medium'>Enjoy Cash on Delivery for Your Convenience</p>
            <p className='text-[14px] md:text-base text-gray-400 font-medium'>Easy Returns and Exchanges Within 7 Days</p>

          </div>


        </div>

      </div>

      <div className='mt-10 bg-white py-5'>

        <div className='bg-primary pb-4 border-b-[1px] border-gray-400'>
            <div className='max-w-[400px] w-full flex items-center gap-4 pl-5'>
                <h2 className='cursor-pointer text-[12px] sm:text-[14px] md:text-base font-medium w-fit relative before:absolute before:w-full before:h-[2px] before:bg-gray-700 before:top-[32px] before:sm:top-[35px] before:md:top-[38px]'>Description</h2>
                <h2 className='cursor-pointer text-[12px] sm:text-[14px] md:text-base font-medium w-fit'>Color Guide</h2>
                <h2 className='cursor-pointer text-[12px] sm:text-[14px] md:text-base font-medium w-fit'>Size Guide</h2>
            </div>
        </div>

        <div className='mt-3 p-5'>
            <div className='text-xl font-semibold'>Detail</div>
            <p className='mt-1 text-[14px] md:text-base text-gray-400 font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae dicta adipisci nihil deserunt delectus? Dignissimos, numquam eum, voluptates reiciendis ipsa maxime enim quasi praesentium est totam neque dolores quam</p>
            <p className='text-[14px] md:text-base text-gray-400 font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed voluptatem magni cupiditate in voluptates non ea.</p>
        </div>

        <div className='mt-5 p-5'>
            <div className='text-xl font-semibold'>Benefit</div>
            <ul className='mt-1 list-disc list-inside'>
                <li className='text-[14px] md:text-base text-gray-400 font-medium'>High-quality materials ensure long-lasting durability and comfort.</li>
                <li className='text-[14px] md:text-base text-gray-400 font-medium'>Designed to meet the needs of modern, active lifestyles.</li>
                <li className='text-[14px] md:text-base text-gray-400 font-medium'>Available in a wide range of colors and trendy colors.</li>
            </ul>
        </div>

      </div>

      <div className='mt-10 bg-primary rounded-md p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
        {detailsData.map((item , index)=>{
            return <div key={index} className='flex items-center gap-4'>

                <div>
                    {item.icon}
                </div>
                <div>
                    <h2 className='text-xl font-semibold'>{item.title}</h2>
                    <h2 className='text-[12px] md:text-[14px] font-normal text-gray-500'>{item.description}</h2>
                </div>

            </div>
        })}
      </div>

      <div className='mt-20'>
        <RelatedProducts relatedProducts={relatedProducts}/>
      </div>

    </div>
  )
}
