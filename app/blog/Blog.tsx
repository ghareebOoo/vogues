"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from "../../src/supabase-clients"
import { Blogs } from "../../types"
import Image from 'next/image'
import BlogCardSkeleton from './BlogCardSkeleton'

export default function Blog() {
  const [blogs , setBlogs] = useState<Blogs[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBlog = async ()=>{
    const {error: fetchBlogError , data} = await supabase
      .from("blogs")
      .select("*")
      .order("created_at" , {ascending: true});

    if(fetchBlogError){
      console.error("fetchBlogError" , fetchBlogError)
    } else {
      setBlogs(data)
    }
    setLoading(false)
  }

  useEffect(()=>{
    fetchBlog()
  },[])

  return (
    <div className='bg-primary pt-8 pb-12 px-4 md:px-12'>
      {loading ? (
        <BlogCardSkeleton count={4} />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {blogs.map((blog ,index)=>(
            <div key={index}>
              <div className='p-5 rounded-md bg-secondary/20'>
                <Image src={blog.image_url} alt='' width={300} height={200} className='w-full rounded-md' />
              </div>
              <div className='mt-3'>
                <span className='text-xl text-gray-50 font-bold'>{blog.category}</span>
                <h2 className='mt-1 text-black font-semibold text-xl'>{blog.title}</h2>
                <p className='mt-2 text-gray-50 font-semibold text-base line-clamp-3'>{blog.description}</p>
                <button className='mt-3 text-black text-base font-medium underline'>continue reading</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
