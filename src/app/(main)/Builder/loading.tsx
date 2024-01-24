import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full gap-4 md:h-[42rem] md:fr fc">
      <Skeleton className="items-center w-full md:w-[50%] fc glass md:h-full h-1/2" />
      <Skeleton className="items-center w-full md:w-[50%] fc glass md:h-full h-1/2 " />
    </div>
  );

  //   return <LoadingSkeleton />;
}
