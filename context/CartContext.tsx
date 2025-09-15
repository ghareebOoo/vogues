"use client"
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { StaticImageData } from 'next/image'

type Cart = {
    id?: number;
    size?: string; 
    price?: number;
    title?: string;
    image: string | StaticImageData;
    quantity: number;
}

type props = {
    cart: Cart[];
    setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
    addToCart: (id:number , image: string | StaticImageData , size: string , title: string , price:number , quantity: number)=> void;
    readyCart: boolean;
    setReadyCart: React.Dispatch<React.SetStateAction<boolean>>;
    decreaseCart: (index:number)=> void;
    increaseCart: (index:number)=> void;
    deleteCart: (index:number)=> void;
}



const cartContext = createContext<props | undefined>(undefined)
export default function CartContextProvider({children}:{children:ReactNode}) {

    const [cart, setCart] = useState<Cart[]>([])
    
    const [readyCart , setReadyCart] = useState<boolean>(false)

    
    const addToCart = (id:number , image: string | StaticImageData  , size: string , title: string , price:number , quantity: number)=>{
    
        setCart((prev)=> {
            const existingIndex = prev.findIndex((item)=> item.id === id && item.size === size)
            if(existingIndex !== -1){
                const updatedCart = [...prev];
                updatedCart[existingIndex].quantity ++
                    return updatedCart
                }
            return [...prev , {id , image , size , title , price , quantity}]
        })
    }
    
    
    const decreaseCart = (index:number)=>{
        const newCart = [...cart]
        if(newCart[index] && newCart[index].quantity > 1){
            newCart[index].quantity --
        }
        setCart(newCart)
    }
    
    const increaseCart = (index:number)=>{
        const newCart = [...cart]
        if(newCart[index]){
            newCart[index].quantity ++
        }
        setCart(newCart)
    }
    
    const deleteCart = (index:number)=>{
        const newCart = [...cart]
        if(newCart[index]){
            newCart.splice(index , 1)
        }
        setCart(newCart)
    }
    
    useEffect(()=>{
        const savedCart = localStorage.getItem("mycart")
        if(savedCart){
            const parsedCart = JSON.parse(savedCart) as Cart[]
            setCart(parsedCart)
        }
        setReadyCart(true)
    },[])
    
    
    useEffect(()=>{
        localStorage.setItem("mycart" , JSON.stringify(cart))
    },[cart])


  return (
    <cartContext.Provider value={{cart, setCart , addToCart , readyCart , setReadyCart , decreaseCart , increaseCart , deleteCart}}>
        {children}
    </cartContext.Provider>
  )
}


export const useCart = ()=>{
    const context = useContext(cartContext)

    if(!context){
        throw new Error("useVOgues context not found");
    }

    return context
}
