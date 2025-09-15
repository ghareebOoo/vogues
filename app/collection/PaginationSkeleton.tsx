"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function PaginationSkeleton() {
  return (
    <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
      {/* Previous button */}
      <Skeleton className="h-8 w-20 rounded-md" />

      {/* Page numbers */}
      <div className="flex items-center gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-md" />
        ))}
      </div>

      {/* Next button */}
      <Skeleton className="h-8 w-20 rounded-md" />
    </div>
  )
}
