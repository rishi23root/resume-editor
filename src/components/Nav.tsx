"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

function Nav() {
  const { isLoaded, isSignedIn } = useAuth();
  return (
    <div className="flex items-center justify-between ">
      <Image
        className="w-40 h-12 lg:w-72 lg:h-16 "
        alt="main logo"
        src="/logo.png"
        width={275}
        height={65}
        priority
      />
      <div className="hidden gap-3 fcc lg:gap-12 lg:text-2xl font-base md:flex">
        <Link href={"/#about"} className="text-violet-50">
          About
        </Link>
        <Link href={"/#features"} className="text-violet-50">
          Features
        </Link>
        <Link href={"/#pricing"} className="text-violet-50">
          Pricing
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2 lg:gap-8 ">
        <NavBtns isLoaded={isLoaded} isSignedIn={isSignedIn} />
      </div>
    </div>
  );
}

function NavBtns({
  isLoaded,
  isSignedIn,
}: {
  isLoaded: Boolean;
  isSignedIn: Boolean | undefined;
}) {
  if (!isLoaded || !isSignedIn) {
    return (
      <>
        <Link
          href={"/sign-in"}
          className="flex items-center justify-center p-2 border md:px-5 rounded-xl border-stone-500 "
        >
          <div className="font-medium text-center lg:text-2xl text-neutral-200">
            Sign in
          </div>
        </Link>
        <Link
          href={"/sign-up"}
          className="flex items-center justify-center p-2 md:px-5 rounded-xl border-stone-500 bg-gradient-to-r from-blue-600 to-fuchsia-500 "
        >
          <div className="font-medium text-center lg:text-2xl text-neutral-200">
            Sign up
          </div>
        </Link>
      </>
    );
  }
  // check if user is signed in or not
  return (
    <Link
      href={"/dashboard"}
      className="p-2 md:px-5 rounded-xl border-stone-500 bg-gradient-to-r from-blue-600 to-fuchsia-500 fcc"
    >
      <div className="gap-2 font-medium text-center lg:text-2xl text-neutral-200 fcc">
        Dashboard{" "}
        <Image
          className="w-[22px] h-[17px] opacity-90 invert"
          alt="arrow svg"
          src="/arrow.svg"
          width={22}
          height={17}
        />
      </div>
    </Link>
  );
}

export default Nav;
