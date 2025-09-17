"use client"
import OurHeading from '@/components/OurHeading'
import Image from 'next/image'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { AiFillCloseCircle } from "react-icons/ai";
import Link from 'next/link'
import { useCart } from '@/context/CartContext';
import CartSkeleton from './CartSkeleton';
import {AnimatePresence, motion} from "framer-motion"

export default function Cart() {

    const {cart , decreaseCart , increaseCart , deleteCart , readyCart } = useCart();

    const totalPrice = cart.reduce((acc , cur)=> acc + (cur.price ?? 0) * cur.quantity , 0)
    const shipping = 10;
    
    const tax = ( totalPrice + shipping) * 0.02
    
    const totalAmount = totalPrice + tax




  return (
    <div className='px-4 md:px-12 py-8 bg-[#f4f4f4]'>
        <OurHeading leftHead='Cart' rightHead='Overview' desc='Discover cosmetics that enhance beauty, deliver radiance and bring confidence to your daily routine'/>

        {!readyCart ? (<CartSkeleton />) : cart.length <= 0 ? (<div className="mt-10">Your cart is empty</div>): 
            <div className=' mt-10 flex flex-col xl:flex-row gap-8'>

                <div className='w-full xl:max-w-[70%]'>

                    <div className='bg-white p-2 flex items-center justify-center md:justify-between'>

                        <div className='w-full max-w-[55%] sm:max-w-[70%]'>
                            <span>Product Details</span>
                        </div>

                        <div className='w-full max-w-[45%] sm:max-w-[30%] flex justify-between items-center'>
                            <span className='w-full'>Subtotal</span>
                            <span className='w-full'>Action</span>
                        </div>

                    </div>

                    <AnimatePresence>
                        {cart.map((item , index)=>{
                        return  <motion.div drag="x" dragConstraints={{left: 0 , right: 0}} 
                            onDragEnd={(e,info)=> {if (Math.abs(info.offset.x) > 100) {deleteCart(index)}}}
                            whileDrag={{scale: 1.03}}
                            initial={{ x: 0, opacity: 1 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 1 , type: "spring"}} 
                            key={index} className='mt-5 bg-white p-2 flex flex-col md:flex-row items-center justify-center md:justify-between gap-5'>

                            <div className='w-full md:max-w-[70%]'>

                                <div className='flex justify-between md:justify-start items-stretch gap-5'>

                                    <div className='bg-gray-400 flex flex-col justify-center items-center'>
                                        <Image src={item.image} alt='image' width={150} height={150} />
                                    </div>

                                    <div className='flex flex-col justify-between items-end md:items-start'>
                                        <h2 className='text-base font-semibold line-clamp-1'>{item.title}</h2>
                                        <div className='my-3 text-lg font-semibold'>Size: <span className='text-gray-500'>{item.size}</span></div>
                                        <div className='bg-gray-300 rounded-full w-[90px] flex justify-between items-center gap-2'>

                                            <div onClick={()=> decreaseCart(index)} className='w-6 h-6 rounded-full text-gray-600 bg-white cursor-pointer flex items-center justify-center'>
                                                <FaMinus className='text-base' />
                                            </div>

                                            <span className='text-gray-600'>{item.quantity}</span> 

                                            <div onClick={()=> increaseCart(index)} className='w-6 h-6 rounded-full text-gray-600 bg-white cursor-pointer flex items-center justify-center'>
                                                <FaPlus className='text-base'/>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className='w-full md:max-w-[30%] flex justify-between items-center'>

                                <div className='md:w-full text-base text-gray-400 font-normal'>${(item.price ?? 0) * item.quantity}</div>

                                <div onClick={()=> deleteCart(index)} className='md:w-full cursor-pointer'>
                                    <AiFillCloseCircle className='text-xl'/>
                                </div>

                            </div>

                        </motion.div>

                    })}
                    </AnimatePresence>

                </div>



                <div className='h-[398px] w-full max-w-[300px] lg:max-w-[30%] bg-white p-2 py-12'>
                    <h3 className='border-b-[1px] border-gray-500 pb-4 text-1xl font-bold'>Order Summery <span className='text-gray-400 font-semibold'>({`${cart.reduce((acc, cur)=> acc + cur.quantity , 0)} Items`})</span></h3>

                    <div className='mt-5 flex w-full justify-between items-center'>
                        <h4 className='text-base font-bold'>TotalPrice</h4>
                        <span className='text-gray-500 font-semibold text-base'>${totalPrice}</span>
                    </div>

                    <div className='mt-5 flex w-full justify-between items-center'>
                        <h4 className='text-base font-bold'>Shipping Fee</h4>
                        <span className='text-gray-500 font-semibold text-base'>$10.00</span>
                    </div>

                    <div className='mt-5 flex w-full justify-between items-center'>
                        <h4 className='text-base font-bold'>Tax (2%)</h4>
                        <span className='text-gray-500 font-semibold text-base'>${tax}</span>
                    </div>

                    <div className='mt-5 mb-8 flex w-full justify-between items-center'>
                        <h4 className='text-base font-bold'>Total Amount:</h4>
                        <span className='text-gray-500 font-semibold text-base'>${totalAmount}</span>
                    </div>

                    <Link href={"/order"} className='cursor-pointer w-full flex justify-center items-center py-3 bg-black text-white'>Proceed to delivery</Link>

                </div>

            </div>
        }
        
    </div>
  )
}
