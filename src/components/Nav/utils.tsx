import { NavProps } from "@/types/utils";
import Link from "next/link";
import { NavLinksDashboard } from "./client";

export function NavLinks({ isSignedIn, pathname }: NavProps) {
  if (!isSignedIn || pathname == "/")
    return (
      <>
        <Link
          href={"/#about"}
          className="text-violet-50 hover:underline underline-offset-8 decoration-blue-500 transition-all duration-300 ease-in-out"
        >
          About
        </Link>
        <Link
          href={"/#features"}
          className="text-violet-50 hover:underline underline-offset-8 decoration-blue-500 transition-all duration-300 ease-in-out"
        >
          Features
        </Link>
        <Link
          href={"/#pricing"}
          className="text-violet-50 hover:underline underline-offset-8 decoration-blue-500 transition-all duration-300 ease-in-out"
        >
          Pricing
        </Link>
        <Link
          href={"/blog"}
          className="text-violet-50 hover:underline underline-offset-8 decoration-blue-500 transition-all duration-300 ease-in-out"
        >
          Blogs
        </Link>
      </>
    );
  return <NavLinksDashboard />;
}
