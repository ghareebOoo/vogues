"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function CartSkeleton() {
  return (
    <div className='px-4 md:px-12 py-8 bg-[#f4f4f4]'>
      <Skeleton className="h-10 w-60 mb-8" /> {/* عنوان Cart Overview */}

      <div className='mt-10 flex flex-col xl:flex-row gap-8'>
        {/* Products List */}
        <div className='w-full xl:max-w-[70%] flex flex-col gap-5'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='bg-white p-2 flex flex-col md:flex-row items-center gap-5'>
              <Skeleton className="w-full md:max-w-[70%] h-36 bg-gray-300" /> {/* صورة المنتج */}
              <div className='flex flex-col justify-between w-full md:max-w-[30%] gap-2'>
                <Skeleton className="h-6 w-3/4" /> {/* اسم المنتج */}
                <Skeleton className="h-4 w-1/2" /> {/* حجم المنتج */}
                <Skeleton className="h-6 w-24" /> {/* الكمية */}
              </div>
              <Skeleton className="h-6 w-20" /> {/* السعر */}
              <Skeleton className="h-6 w-6 rounded-full" /> {/* زر الحذف */}
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className='h-[398px] w-full max-w-[300px] lg:max-w-[30%] bg-white p-2 py-12 flex flex-col gap-4'>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-10 w-full mt-auto" /> {/* زر Proceed */}
        </div>
      </div>
    </div>
  )
}
