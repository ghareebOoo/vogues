"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="group">
          {/* نفس البوكس بتاع الصورة */}
          <div className="bg-[#F6F9F6] rounded-md relative z-10 flex items-center justify-center h-[250px]">
            <Skeleton className="h-40 w-40 rounded-md" />
            <div className="absolute top-2 right-2">
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[95%]">
              <Skeleton className="h-9 w-full rounded-full" />
            </div>
          </div>

          {/* العنوان + السعر */}
          <div className="mt-3 flex items-center justify-between">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-12" />
          </div>

          {/* الوصف */}
          <div className="mt-2 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}
