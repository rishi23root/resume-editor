import Nav from "@/components/Nav";
import { userLogined } from "@/utils/serverActions/pageLoad";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // import the user data here
  // const user = await currentUser();
  // console.log("user private Data: ", user?.privateMetadata);
  const data = await userLogined()
  // console.log(data.userDBid)

  // const data = getUserId()
  // console.log(data);

  return (
    <>
      <div className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] flex flex-col lg:gap-20 gap-8 w-full">
        <Nav />
      </div>
      <main className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] lg:gap-10 gap-4 fr flex-1 ">
        {children}
        {/* <TwScreenInfo /> */}
      </main>
    </>
  );
}
