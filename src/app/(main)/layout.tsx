import Nav from "@/components/Nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
