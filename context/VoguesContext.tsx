"use client"
import React, { createContext, ReactNode , useCallback, useContext, useEffect, useState  } from 'react'
import { supabase } from '../src/supabase-clients'
import {DummyProducts} from "../types"


type props = {
    products: DummyProducts[];
    setProducts: React.Dispatch<React.SetStateAction<DummyProducts[]>>;
}

const VoguesContext = createContext<props | undefined>(undefined)
export default function VoguesContextProvider({children}:{children:ReactNode}) {

        const [products , setProducts] = useState<DummyProducts[]>([])
    
        const fetchProducts = useCallback(async ()=>{
            const {error:fetchProductsError , data} = await supabase.from("products").select("*").order("created_at" , {ascending: true})
            if(fetchProductsError){
                console.error("fetchProductsError:" , fetchProductsError);
                return;
            }
            setProducts(data)
        } ,[])
    
        useEffect(()=>{
            fetchProducts()
        },[fetchProducts])

        
  return (
    <VoguesContext.Provider value={{products , setProducts}}>
        {children}
    </VoguesContext.Provider>
  )
}

export const useVOgues = ()=>{
    const context = useContext(VoguesContext)

    if(!context){
        throw new Error("useVOgues context not found");
    }

    return context
}
