import { NavProps } from "@/types/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "./utils";
import { HamburgerOnMobile, NotificationElement } from "./client";

function Nav({ isSignedIn, pathname }: NavProps) {
  return (
    <div className="pr-2 fcb">
      <Link href={pathname != "/dashboard" ? "/dashboard" : "/"}>
        <Image
          className="w-40 h-12 lg:w-72 lg:h-16 "
          alt="main logo"
          src="/logo.png"
          width={275}
          height={65}
          priority
        />
      </Link>
      <div className="hidden gap-3 fcc lg:gap-12 lg:text-2xl font-base md:flex">
        <NavLinks isSignedIn={isSignedIn} pathname={pathname} />
      </div>
      <div className="flex items-center justify-center gap-2 lg:gap-8 ">
        <NavBtns isSignedIn={isSignedIn} pathname={pathname} />
      </div>
    </div>
  );
}

function NavBtns(props: NavProps) {
  const { isSignedIn, pathname } = props;
  if (!isSignedIn) {
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
  } else {
    // user is signed in
    // conditional redering for pages
    // if pages parent is dashboard that mean no need to show go
    // basically protective route and show user specific content

    // extract current page
    if (pathname == "/") {
      return (
        <Link
          href={"/dashboard"}
          className="p-2 md:px-5 rounded-xl border-stone-500 bg-gradient-to-r from-blue-600 to-fuchsia-500 fcc"
        >
          <div className="gap-2 font-medium text-center lg:text-2xl text-neutral-200 fcc">
            Dashboard{" "}
            <Image
              className="w-[30px] h-[20px] fill-white"
              alt="arrow svg"
              src="/svgs/arrow.svg"
              width={30}
              height={20}
            />
          </div>
        </Link>
      );
    } else {
      // import user btns and other element to render in place of btn
      return (
        <div className="gap-4 md:gap-8 fcc">
          <div className="icon">
            <NotificationElement />
          </div>
          <div className="relative w-8 h-8 overflow-hidden rounded-full bg-slate-600 ">
            <div className="absolute z-10">
              <UserButton
                afterSignOutUrl="/sign-in"
                afterSwitchSessionUrl="/dashboard"
              />
            </div>
            <div className="absolute top-0 left-0 w-3 h-3 translate-x-[0.5rem] translate-y-1 bg-black rounded-full  face"></div>
            <div className="absolute top-0 left-0 w-6 h-6 translate-x-1 translate-y-3 bg-black rounded-full "></div>
          </div>
          <div className="w-fit md:hidden fc">
            <HamburgerOnMobile {...props} />
          </div>
        </div>
      );
    }
  }
}

export default Nav;
