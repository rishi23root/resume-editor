"use client";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import React from "react";
// import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notification, NotificationArr } from "@/types/utils";
import { cn } from "@/lib/utils";
import RenderCompleted from "@/hooks/RenderCompleted";

function Nav() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const rendered = RenderCompleted();

  return (
    <div className="fcb">
      <Image
        className="w-40 h-12 lg:w-72 lg:h-16 "
        alt="main logo"
        src="/logo.png"
        width={275}
        height={65}
        priority
      />
      <div className="hidden gap-3 fcc lg:gap-12 lg:text-2xl font-base md:flex">
        {rendered && <NavLinks isSignedIn={isSignedIn} pathname={pathname} />}
      </div>
      <div className="flex items-center justify-center gap-2 lg:gap-8 ">
        {rendered && <NavBtns isSignedIn={isSignedIn} pathname={pathname} />}
      </div>
    </div>
  );
}

function NavLinks({
  isSignedIn,
  pathname,
}: {
  isSignedIn: Boolean | undefined;
  pathname: string;
}) {
  if (!isSignedIn)
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
      <Link href={"/Templates"} className="text-violet-50">
        Templates
      </Link>
      <Link href={"/JobDescriptions"} className="text-violet-50">
        Job Descriptions
      </Link>
    </>
  );
    
}

function NavBtns({
  isSignedIn,
  pathname,
}: {
  isSignedIn: Boolean | undefined;
  pathname: string;
}) {
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
              className="w-[22px] h-[17px] opacity-90 invert"
              alt="arrow svg"
              src="/arrow.svg"
              width={22}
              height={17}
            />
          </div>
        </Link>
      );
    } else {
      // import user btns and other element to render in place of btn
      return (
        <div className="gap-8 fcc">
          <div className="icon">
            <NotificationElement />
          </div>
          <div className="w-9 icon">
            <UserButton afterSwitchSessionUrl="/" afterSignOutUrl="/" />
          </div>
        </div>
      );
    }
  }
}

function NotificationElement() {
  const router = useRouter();
  const ref = useRef(null);

  // fetch notifications
  const [notification, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    // check every 2 minute if any request in que
    // if it does then every 30sec check for notifiction
    // else no need
    const id = setTimeout(() => {
      setNotifications((prec) => [
        ...prec,
        {
          type: "warn",
          message: "resume builded",
        },
        {
          type: "info",
          message: "unable to build retry",
        },
        {
          type: "alert",
          message: "resume builded",
        },
        {
          type: "error",
          message: "unable to build retry",
        },
      ]);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const classForNotification = {
    info: "bg-gray-700",
    alert: "bg-red-700 ",
    warn: "bg-yellow-200  text-black",
    error: "bg-orange-300 text-black ",
  };

  return (
    <div className="relative w-[40px] h-[40px] pointer hover:border border-gray-600 rounded ">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
            <Image
              src={"/notification.svg"}
              width={40}
              height={40}
              className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="notification to update"
            />
            {notification.length > 0 && (
              <Image
                src={"/newNotification.svg"}
                width={40}
                height={40}
                className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="notification to update"
              />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          ref={ref}
          className="w-[20em] translate-y-5 -translate-x-12 bg-[#252526] border-none rounded shadow-2xl  "
        >
          <DropdownMenuLabel className="text-center">
            Notifications
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notification.map((noti, index) => {
            return (
              <DropdownMenuItem
                onClick={() => {
                  // if link is provied then navigate there ele pass
                  noti.link && router.push(noti.link);
                }}
                key={noti.message + index}
                className={cn(
                  `m-1 p-2 max-h-12 opacity-[.8]`,
                  classForNotification[noti.type],
                  "relative",
                  "cursor-pointer"
                )}
              >
                {(noti.type as string).toUpperCase()}: {noti.message}
                {noti.link && (
                  <div className="absolute bottom-0 h-full font-bold tracking-widest right-3 fcc cursor-grab">
                    <Image
                      src={"/arrow.svg"}
                      width={20}
                      height={20}
                      alt="thisis "
                      className="-rotate-12"
                    />
                  </div>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Nav;
