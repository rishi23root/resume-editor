import Footer from "@/components/Footer";
import Nav from "@/components/Nav/index";
import BackToTopBtn from "@/components/pageSpecific/home/BackToTop";
import { newUserLoginHandler } from "@/utils/pageLoad";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

import { Suspense } from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await newUserLoginHandler();
  // effective for only first login
  return (
    <div>
      <div className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] flex flex-col lg:gap-20 gap-8 w-full">
        <Nav isSignedIn={data ? true : false} pathname="/dashboard" />
      </div>
      <main className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] flex flex-col lg:gap-20 gap-8">
        <Suspense>{children}</Suspense>
        {/* back to dashboard */}
        <div className="fc justify-center items-center">
          <Link
            href="/dashboard"
            className="fr rounded-md gap-2 p-2 px-3 border bg-[#6c11ed] "
          >
            <MoveLeft />
            Back to Dashboard
          </Link>
        </div>
        <Footer />
        {/* <BackToTopBtn /> */}
      </main>
    </div>
  );
}
