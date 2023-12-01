import Nav from "@/components/Nav/index";
import { newUserLoginHandler } from "@/utils/pageLoad";

import { Toaster } from "@/components/ui/toaster";
import ShowErrorIfany from "@/components/elements/errorRender";
import TwScreenInfo from "@/components/custom/TwScreenInfo";
import ProcegureRender from "@/components/pageSpecific/ProcegureRender";
import { Suspense } from "react";
import TRPCProvider from "../../serverTRPC/Provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await newUserLoginHandler(); // effective for only first login
  // console.log(data.userDBid)

  // trpc context provider or wrapper the main pages only
  return (
    <TRPCProvider>
      {/* addeding toast component */}
      <Toaster />
      {/* main layout for all pages  */}
      <div className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] flex flex-col lg:gap-20 gap-8 w-full">
        <Nav isSignedIn={data ? true : false} pathname="/Dashboard" />
        {/* pathname value is hardcoded here because it doesn't matter which path it is just not '/' */}
      </div>
      <main className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2rem] gap-4 fc flex-1">
        <ProcegureRender />
        <div className="lg:gap-10 gap-4 fr flex-1 ">
          <Suspense>{children}</Suspense>
        </div>
      </main>
      <ShowErrorIfany />
      {/* <TwScreenInfo /> */}
    </TRPCProvider>
  );
}
