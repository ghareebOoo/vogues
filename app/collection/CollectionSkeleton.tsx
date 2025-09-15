"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function CollectionSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="group">
          <div className="rounded-md relative z-10 bg-gray-200">
            <Skeleton className="w-full h-[200px] rounded-md mx-auto" />
            <Skeleton className="absolute top-2 right-2 h-6 w-16 rounded-full" /> {/* type badge */}
            <Skeleton className="absolute bottom-2 left-[50%] translate-x-[-50%] w-[95%] h-8 rounded-full" /> {/* Quick view */}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Skeleton className="h-6 w-3/4" /> {/* title */}
            <Skeleton className="h-5 w-12" /> {/* price */}
          </div>
          <Skeleton className="mt-2 h-12 w-full" /> {/* description */}
        </div>
      ))}
    </div>
  )
}
