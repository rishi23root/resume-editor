import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center w-full gap-4 fc">
      <Skeleton className="w-full h-20 rounded-md" />
      <div className="flex-1 w-full gap-4 fr">
        <Skeleton className="w-full h-full rounded-md" />
        <Skeleton className="w-full h-full rounded-md" />
      </div>
    </div>
  );

  //   return <LoadingSkeleton />;
}
