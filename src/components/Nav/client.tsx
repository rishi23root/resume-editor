"use client";
import useNotification from "@/hooks/NotificationHandeller";
import { NavProps, Notification } from "@/types/utils";
import { useState } from "react";
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
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavLinks } from "./utils";
import useRedirectHandler from "@/hooks/redirectionHandlers";

// logo element
export function LogoElementWithLink() {
  // check for the pathname
  const pathname = usePathname();

  // for the nav link conditions
  // if on / page then show dashboard link
  // if on dashboard page then show / link
  // if any on any other page then show dashboard link
  const currentRedirectingPath =
    pathname === "/"
      ? "/dashboard"
      : pathname === "/dashboard"
      ? "/"
      : "/dashboard";

  return (
    <Link href={currentRedirectingPath}>
      <Image
        className="w-40 h-12 lg:w-72 lg:h-16"
        alt="main logo"
        src="/logo.png"
        width={275}
        height={65}
        priority
      />
    </Link>
  );
}

// notification components
export function NotificationElement() {
  const notification = useNotification();
  // const [open, setopen] = useState(false);
  return (
    <div className="relative w-[40px] h-[40px] pointer hover:border border-gray-600 rounded md:block hidden">
      <DropdownMenu
        open={false}
        // onOpenChange={setopen}
      >
        <DropdownMenuTrigger className="">
          <div>
            <Image
              src={"/svgs/notification.svg"}
              width={40}
              height={40}
              className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-50 cursor-not-allowed"
              alt="notification to update"
            />
            {/* {notification.length > 0 && (
              <Image
                src={"/svgs/newNotification.svg"}
                width={40}
                height={40}
                className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="notification to update"
              />
            )} */}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[20em] translate-y-7 -translate-x-12 bg-[#12141D] rounded-2xl shadow-xl shadow-[#f0f0f005] gap-2 flex flex-col p-2 border border-white border-opacity-10">
          <DropdownMenuLabel className="text-center">
            Notifications
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <NotificationRenderer
            notification={notification}
            // setopen={setopen}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function HamburgerOnMobile(props: NavProps) {
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

export function NavLinksDashboard() {
  const { urlWithOnlyTheseParams } = useRedirectHandler();

  return (
    <>
      <Link
        href={urlWithOnlyTheseParams("/Templates", {
          templateName: "singleColumn",
        })}
        className="text-violet-50"
      >
        Templates
      </Link>
      <Link
        href={urlWithOnlyTheseParams("/Payment")}
        className="text-violet-50"
      >
        Price
      </Link>
      <Link
        href={urlWithOnlyTheseParams("/JobDescriptions")}
        className="text-violet-50"
      >
        Job Descriptions
      </Link>
    </>
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
              `m-1 p-2  bg-opacity-10 border rounded-lg border-opacity-10 shadow-sm border-white text-sm md:text-xl h-fit`,
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
