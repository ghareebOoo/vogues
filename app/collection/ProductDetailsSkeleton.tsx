"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailsSkeleton() {
  return (
    <div className='px-4 md:px-12 py-12'>
      <div className='mt-8 flex flex-col xl:flex-row xl:h-[500px] xl:items-stretch gap-8'>
        {/* Images */}
        <div className='w-full xl:h-full max-w-[600px] xl:max-w-full flex gap-2'>
          <div className='flex flex-col gap-2 justify-between xl:h-full'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-24 xl:h-32 rounded-md" />
            ))}
          </div>
          <Skeleton className='xl:h-full flex-grow rounded-md w-full' />
        </div>

        {/* Details */}
        <div className='w-full bg-primary p-5 rounded-md flex flex-col gap-4'>
          <Skeleton className='h-6 w-1/2' /> {/* Title */}
          <Skeleton className='h-6 w-1/3' /> {/* Price */}
          <Skeleton className='h-4 w-full' /> {/* Description */}
          <div className='flex gap-2'>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className='h-8 w-16 rounded-md' /> 
            ))}
          </div>
          <div className='flex gap-2'>
            <Skeleton className='h-10 flex-1 rounded-full' /> {/* Add to Cart */}
            <Skeleton className='h-10 w-10 rounded-full' /> {/* Loved */}
          </div>
          <Skeleton className='h-4 w-3/4' /> {/* Delivery info */}
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-4 w-1/4' />
        </div>
      </div>

      {/* Details Info */}
      <div className='mt-10 bg-white py-5 flex flex-col gap-3'>
        <Skeleton className='h-6 w-1/4' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </div>

      {/* Benefits */}
      <div className='mt-5 p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='flex gap-4 items-center'>
            <Skeleton className='h-8 w-8 rounded-full' />
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-3 w-2/3' />
            </div>
          </div>
        ))}
      </div>

      {/* Related Products */}
      <div className='mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton className='h-48 w-full rounded-md' />
            <Skeleton className='h-4 w-3/4 mt-2' />
            <Skeleton className='h-4 w-1/2 mt-1' />
          </div>
        ))}
      </div>
    </div>
  )
}
