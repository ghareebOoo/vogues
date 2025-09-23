"use client"
import Image from 'next/image'
// import Link from 'next/link'
import {motion} from "framer-motion"
import React, { useEffect, useMemo, useState } from 'react'
import close from "../../public/src/assets/close.svg"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { useVOgues } from '@/context/VoguesContext'
import iconSearch from "../../public/src/assets/search.svg"
import Link from 'next/link'
import CollectionSkeleton from './CollectionSkeleton'
import SidebarSkeleton from './SidebarSkeleton'
import PaginationSkeleton from './PaginationSkeleton'




export default function Collection() {


  const [currentPage , setCurrentPage] = useState(1)

  const {products} = useVOgues();

 


  const [showSideBar , setShowSideBar] = useState(true)
  const [isDesktop, setIsDesktop] = useState(true);

    useEffect(()=>{
    const handelResize = ()=>{
      if(window.innerWidth >= 1280){
        setIsDesktop(true)
        setShowSideBar(true)
      }else{
        setIsDesktop(false)
        setShowSideBar(false)
      }
    }

    handelResize()

    window.addEventListener("resize" , handelResize)

    return  ()=>{
      window.removeEventListener("resize" , handelResize)
    }
  },[])


  const [chooseLevl , setChooseLevel] = useState("relevant");
  const [categories , setCategories] = useState<string[]>([]);
  const [types , setTypes] = useState<string[]>([]);
  const [searech , setSearch] = useState("")

  const handelLevel = (value:string)=>{
    setChooseLevel(value)
  }


  const filterCategories = useMemo(() => [...new Set(products.map((pro) => pro.category))],
    [products]
  );

  const filterTypes = useMemo(() => [...new Set(products.filter((pro) => categories.length === 0 || categories.includes(pro.category)).map((pro) => pro.type))],
    [products, categories]
  );



  const filteredData = useMemo(() => {
  let data = [...products];

  if (searech) {
    data = data.filter((item) => item.title.toLowerCase().trim().includes(searech.toLowerCase().trim()) );
  }

if (chooseLevl === "low") {
  data = [...data].sort((a, b) => Object.values(a.price)[0] - Object.values(b.price)[0]);
} else if (chooseLevl === "high") {
  data = [...data].sort((a, b) => Object.values(b.price)[0] - Object.values(a.price)[0]);
}


  if (categories.length > 0) {
    data = data.filter((item) => categories.includes(item.category));
  }

  if (types.length > 0) {
    data = data.filter((item) => types.includes(item.type));
  }

  return data;
}, [products, searech, chooseLevl, categories, types]);



  const handelCategries = (value:string)=>{
    setCategories((prev)=> prev.includes(value) ? prev.filter((item)=> item !== value) : [...prev , value]);
  }


  const handelTypes = (value:string)=>{
    setTypes((prev)=> prev.includes(value) ? prev.filter((item)=> item !== value) : [...prev , value]);
  }

  const perPage = 6;
  const totalPage = Math.ceil(filteredData.length / perPage);
  const paginatedProducts = useMemo(
    () => filteredData.slice((currentPage - 1) * perPage , currentPage * perPage),
    [filteredData, currentPage]
  );

  useEffect(() => {
  setCurrentPage(1);
}, [searech, chooseLevl, categories, types]);

const isLoading = !products || products.length === 0



 
  return (
    <div className='px-4 md:px-8 pt-8 pb-12'>

      <button onClick={()=>setShowSideBar(true)} className='xl:hidden cursor-pointer mb-5 text-2xl font-bold'>choose category or Type</button>

      <div className='flex gap-8'>

        {showSideBar && (isLoading ? <SidebarSkeleton/> :     <motion.div initial={{ y: isDesktop ? 0 : "-130%"  }} animate={{ y: 0, transition: { duration: 0.7, ease: "easeOut" } }} className={` xl:block xl:translate-y-0 absolute z-40 top-[120px] xl:static left-[50%] translate-x-[-50%] xl:translate-x-0 w-full xl:w-[300px] h-auto bg-primary rounded-md p-2`}>
          <div onClick={()=>setShowSideBar(false)} className='xl:hidden cursor-pointer absolute right-2 top-2'>
            <Image  src={close} alt='icon' width={30} height={30} className='text-[30px]' />
          </div>
          <div className='w-full h-[40px] relative mt-8 mb-3'>
            <input onChange={(e)=> setSearch(e.target.value)} type='search' placeholder='Search...' className='bg-white h-full w-full px-4 py-1 rounded-full border-[1px] border-gray-500' />
            <Image src={iconSearch} alt='icon-search' width={25} height={25} className='text-[25px] absolute top-[50%] translate-y-[-50%] right-2'/>
          </div>
          <div className='p-2.5 bg-white rounded-md'>
            <h2 className='text-xl font-bold'>Sort By</h2>
          <Select value={chooseLevl} onValueChange={handelLevel}>
            <SelectTrigger className="w-full mt-5">
              <SelectValue placeholder="Relevant" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="relevant">Relevant</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
          <div className='mt-3 p-2.5 bg-white rounded-md'>
            <h3 className='text-xl font-bold'>Categories</h3>
            <div className='mt-5 flex flex-col gap-3'>
              {filterCategories.map((item , index)=>{
                return <div key={index} className='flex items-center gap-2'>
                  <input type='checkbox' value={item} checked={categories.includes(item)} onChange={(e)=> handelCategries(e.target.value)}/>
                  <label>{item}</label>
                </div>
              })}
            </div>
          </div>
          <div className='mt-3 p-2.5 bg-white rounded-md'>
            <h3 className='text-xl font-bold'>Types</h3>
            <div className='mt-5 flex flex-col gap-3'>
              {filterTypes.map((item , index)=>{
                return <div key={index} className='flex items-center gap-2'>
                  <input type='checkbox' value={item} checked={types.includes(item)} onChange={(e)=> handelTypes(e.target.value)}/>
                  <label>{item}</label>
                </div>
              })}
            </div>
          </div>
        </motion.div> )}
        <div className='flex flex-col gap-8 w-full xl:max-w-[80%]'>
        <div className='bg-white'>
            {isLoading ? (
    <CollectionSkeleton count={perPage} />
  ): ( <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    {paginatedProducts.map((product , index)=>{
            return  <div className='group' key={index}>
                      <div className={`${["Coconut Body Oil", "Almond Body Oil", "Lavender Body Oil"].includes(product.title) ? "bg-[#F2F2F2]" : "bg-[#F6F9F6]"} rounded-md relative z-10`}>
                        <Image src={index === 1 && product.images[1] ? product.images[1] : product.images[0]} alt='image' width={200} height={200} className='mx-auto' />
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
         {isLoading ? <PaginationSkeleton /> : (
  <div className='mt-8 flex items-center justify-center gap-4 flex-wrap'>
    <button onClick={()=>setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={`${currentPage === 1 ? "cursor-not-allowed bg-gray-700 text-white" : "bg-black/10"} cursor-pointer px-3 py-1`}>previous</button>

    <div className='flex items-center gap-4'>
      {Array.from({length: totalPage}).map((_, i)=>{
        return <button className={`cursor-pointer px-2.5 py-1 ${currentPage === i+1 ? "bg-black text-white" : "bg-white text-black"}`} onClick={()=>setCurrentPage(i + 1) } key={i}>{i+1}</button>
      })}
    </div>

    <button onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPage} className={`${currentPage === totalPage ? "cursor-not-allowed bg-gray-700 text-white" : "bg-black/10"} cursor-pointer px-3 py-1`}>Next</button>
  </div>
)}

        </div>
      </div>
    </div>
  )
}
