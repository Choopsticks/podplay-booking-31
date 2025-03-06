
import { Skeleton } from "@/components/ui/skeleton";

export const ActivityHeroSkeleton = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
            
            <Skeleton className="h-10 w-full max-w-lg" />
            
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-32" />
              <div className="h-4 w-px bg-gray-300"></div>
              <Skeleton className="h-5 w-40" />
            </div>
            
            <Skeleton className="h-24 w-full" />
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-40" />
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <Skeleton className="aspect-h-3 aspect-w-5 rounded-xl h-72 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const ActivityDescriptionSkeleton = () => {
  return (
    <section className="py-10 bg-background">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <Skeleton className="h-10 w-48 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const ActivityCalendarSkeleton = () => {
  return (
    <section className="bg-background py-12" id="booking">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
            <Skeleton className="h-8 w-56 mb-2" />
            <Skeleton className="h-5 w-72 mb-6" />
            
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <Skeleton className="h-72 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full mt-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ReviewSectionSkeleton = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <Skeleton className="h-8 w-40 mb-6" />
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border p-6 bg-card">
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
