import { NavProps } from "@/types/utils";
import Link from "next/link";
import { NavLinksDashboard } from "./client";

export function NavLinks({ isSignedIn, pathname }: NavProps) {
  if (!isSignedIn || pathname == "/")
    return (
      <>
        <Link href={"/#about"} className="text-violet-50">
          About
        </Link>
        <Link href={"/#features"} className="text-violet-50">
          Features
        </Link>
        <Link href={"/#pricing"} className="text-violet-50">
          Pricing
        </Link>
      </>
    );
  return <NavLinksDashboard />;
}
