"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useNotification from "@/hooks/NotificationHandeller";
import RenderCompleted from "@/hooks/RenderCompleted";
import { cn } from "@/lib/utils";
import { Notification } from "@/types/utils";
import { UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type NavProps = {
  isSignedIn: Boolean | undefined;
  pathname: string;
};

function Nav() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const rendered = RenderCompleted();

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
        {rendered && <NavBtns isSignedIn={isSignedIn} pathname={pathname} />}
      </div>
    </div>
  );
}

function NavLinks({ isSignedIn, pathname }: NavProps) {
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
          <div className="w-9 icon">
            <UserButton afterSwitchSessionUrl="/" afterSignOutUrl="/" />
          </div>
          <div className=" w-fit md:hidden fc" >
            <HamburgerOnMobile {...props} />
          </div>
        </div>
      );
    }
  }
}

// notification components
function NotificationElement() {
  const notification = useNotification();
  const [open, setopen] = useState(false);
  return (
    <div className="relative w-[40px] h-[40px] pointer hover:border border-gray-600 rounded md:block hidden">
      <DropdownMenu open={open} onOpenChange={setopen}>
        <DropdownMenuTrigger>
          <div>
            <Image
              src={"/svgs/notification.svg"}
              width={40}
              height={40}
              className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="notification to update"
            />
            {notification.length > 0 && (
              <Image
                src={"/svgs/newNotification.svg"}
                width={40}
                height={40}
                className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="notification to update"
              />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[20em] translate-y-7 -translate-x-12 bg-[#12141D] rounded-2xl shadow-xl shadow-[#f0f0f005] gap-2 flex flex-col p-2 border border-white border-opacity-10">
          <DropdownMenuLabel className="text-center">
            Notifications
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <NotificationRenderer notification={notification} setopen={setopen} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function NotificationRenderer({
  notification,
  setopen,
}: {
  notification: Notification[];
  setopen?: (a: boolean) => void;
}) {
  const router = useRouter();
  const classForNotification = {
    info: "bg-blue-500",
    alert: "bg-red-500 ",
    warn: " bg-yellow-500 ",
    error: " bg-red-700",
  };
  return (
    <>
      {notification.map((noti, index) => {
        return (
          <div
            onClick={() => {
              // if link is provied then navigate there ele pass
              noti.link && router.push(noti.link);
              if (setopen) setopen(false);
            }}
            key={noti.message + index}
            className={cn(
              `m-1 p-2 max-h-12 bg-opacity-10 border rounded-lg border-opacity-10 shadow-sm border-white`,
              classForNotification[noti.type],
              "relative",
              "cursor-pointer"
            )}
          >
            {(noti.type as string).toUpperCase()}: {noti.message}
            {noti.link && (
              <div className="absolute bottom-0 h-full font-bold tracking-widest right-3 fcc cursor-grab">
                <Image
                  src={"/svgs/arrow.svg"}
                  width={20}
                  height={20}
                  alt="small arrow img "
                  className="-rotate-12"
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function HamburgerOnMobile(props: NavProps) {
  const [open, setOpen] = useState(false);
  const notification = useNotification();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <svg viewBox="0 0 50 50" width="32px" height="32px" fill="white">
          <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z" />
        </svg>
      </SheetTrigger>
      <SheetContent className="bg-[#12141D] fc">
        <SheetHeader className="text-start">
          <SheetTitle className="pb-4">Links</SheetTitle>
          <SheetDescription
            className="flex flex-col gap-4 text-2xl underline text-start underline-offset-4 decoration-[#6255C2]"
            onClick={(_) => setOpen(false)}
          >
            <NavLinks {...props} />
          </SheetDescription>
        </SheetHeader>

        <SheetHeader className="text-start">
          {/* notifications */}
          {notification.length && (
            <SheetTitle className="pt-12 pb-4">Notification</SheetTitle>
          )}
          <div
            className="flex flex-col gap-2 text-lg "
            onClick={(_) => setOpen(false)}
          >
            <NotificationRenderer notification={notification} />
          </div>
        </SheetHeader>

        <div className="flex-1 "></div>

        {/* if not on dashboard page */}
        {props.pathname != "/dashboard" && (
          <Link
            href={"/dashboard"}
            className="items-center gap-4 fr"
            onClick={(_) => setOpen(false)}
          >
            <Image
              src={"/svgs/arrow.svg"}
              className="rotate-180"
              width={30}
              height={30}
              alt=";t"
            ></Image>
            Back to Dashboard
          </Link>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default Nav;
