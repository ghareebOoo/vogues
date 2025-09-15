"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function SidebarSkeleton() {
  return (
    <div className="xl:block xl:translate-y-0 absolute z-50 top-[120px] xl:static left-[50%] translate-x-[-50%] xl:translate-x-0 w-full xl:w-[300px] h-auto bg-primary rounded-md p-2 space-y-4">
      
      {/* Close Button */}
      <Skeleton className="xl:hidden w-8 h-8 rounded-full absolute right-2 top-2" />

      {/* Search */}
      <div className="w-full h-[40px] relative">
        <Skeleton className="w-full h-full rounded-full" />
      </div>

      {/* Sort By */}
      <div className="p-2.5 bg-white rounded-md space-y-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Categories */}
      <div className="p-2.5 bg-white rounded-md space-y-2">
        <Skeleton className="h-6 w-1/2" />
        <div className="mt-2 space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full rounded" />
          ))}
        </div>
      </div>

      {/* Types */}
      <div className="p-2.5 bg-white rounded-md space-y-2">
        <Skeleton className="h-6 w-1/2" />
        <div className="mt-2 space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full rounded" />
          ))}
        </div>
      </div>

    </div>
  )
}
