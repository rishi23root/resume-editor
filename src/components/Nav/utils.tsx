import { NavProps } from "@/types/utils";
import Link from "next/link";

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
  return (
    <>
      <Link href={"/New"} className="text-violet-50">
        New +
      </Link>
      <Link
        href={"/Templates?templateName=singleColumn"}
        className="text-violet-50"
      >
        Templates
      </Link>
      <Link href={"/JobDescriptions"} className="text-violet-50">
        Job Descriptions
      </Link>
    </>
  );
}
