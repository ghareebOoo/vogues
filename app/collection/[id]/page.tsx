import React from 'react'
import ProductDetails from './ProductDetails'

export default async function page({params}:{params: {id: string}}) {

    const {id} = await params
  return (
    <div>
        <ProductDetails id={id}/>
    </div>
  )
}
