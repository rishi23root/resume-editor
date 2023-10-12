const BubbleUnderlay = dynamic(
  () => import("@/components/custom/BubbelUnderLay")
);

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import NoSSR from "../../hooks/NoSSR";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-auto fcc">
      <Suspense>
        <NoSSR>
          <BubbleUnderlay
            className={cn(
              "fixed",
              "top-0 left-0",
              "w-full h-full",
              "-z-10",
              "pointer-events-none",
              "select-none"
            )}
          />
        </NoSSR>
      </Suspense>
      {children}
    </div>
  );
}
