import Nav from "@/components/Nav/index";
import { userLogined } from "@/utils/serverActions/pageLoad";

import { Toaster } from "@/components/ui/toaster";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await userLogined();
  // console.log(data.userDBid)

  return (
    <>
      {/* addeding toast component */}
      <Toaster />
      <div className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] flex flex-col lg:gap-20 gap-8 w-full">
        <Nav isSignedIn={data ? true : false} pathname="/dashboard" />
        {/* pathname value is hardcoded here because it doesn't matter which path it is just not '/' */}
      </div>
      <main className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] lg:gap-10 gap-4 fr flex-1 ">
        {children}
      </main>
    </>
  );
}
