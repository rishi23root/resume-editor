import Footer from "@/components/Footer";
import Nav from "@/components/Nav/index";
import BackToTopBtn from "@/components/pageSpecific/home/BackToTop";
import { newUserLoginHandler } from "@/utils/pageLoad";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

import { Suspense } from "react";
import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

// Open_Sans;
const fontInUse = Open_Sans({ weight: "400", subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await newUserLoginHandler();
  // effective for only first login
  return (
    <div className="min-h-screen flex flex-col">
      <div className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] flex flex-col lg:gap-20 gap-8 w-full">
        <Nav isSignedIn={data ? true : false} pathname="/dashboard" />
      </div>
      <main
        className={cn(
          "flex-1 app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] flex flex-col lg:gap-20 gap-8",
          fontInUse.className
        )}
      >
        <Suspense>{children}</Suspense>
        <BackToTopBtn />
        <Footer />
      </main>
    </div>
  );
}
