import { clsx } from "clsx";
import Nav from "../../../components/Nav";

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
      {children}
    </>
  );
}
