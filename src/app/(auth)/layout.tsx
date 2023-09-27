import { clsx } from "clsx";

const BubbleUnderlay = dynamic(
  () => import("@/components/custom/BubbelUnderLay")
);

import dynamic from "next/dynamic";
import NoSSR from "../../hooks/NoSSR";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-auto fcc">
      <NoSSR>
        <BubbleUnderlay
          className={clsx(
            "fixed",
            "top-0 left-0",
            "w-full h-full",
            "-z-10",
            "pointer-events-none",
            "select-none"
          )}
        />
      </NoSSR>
      {children}
    </div>
  );
}
