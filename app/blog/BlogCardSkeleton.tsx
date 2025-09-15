"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <div className="p-5 rounded-md bg-secondary/20">
            <Skeleton className="w-full h-[200px] rounded-md" />
          </div>
          <div className="mt-3 space-y-2">
            <Skeleton className="h-6 w-24" /> {/* category */}
            <Skeleton className="h-6 w-3/4" /> {/* title */}
            <Skeleton className="h-16 w-full" /> {/* description */}
            <Skeleton className="h-5 w-32" /> {/* continue reading btn */}
          </div>
        </div>
      ))}
    </div>
  )
}
