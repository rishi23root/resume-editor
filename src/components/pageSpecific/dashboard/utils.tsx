"use client";


import Seperator from "@/components/pageSpecific/Seperator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { UserButton, useClerk } from "@clerk/nextjs";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Book,
  Cpu,
  DoorClosed, Download, HardDriveUpload,
  LayoutPanelTop, MoreHorizontal, PencilRuler
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

const DashboardNavBtn = ({
  children,
  onTap,
}: {
  children: React.ReactNode;
  onTap?: () => void;
}) => {
  return (
    <Button
      className={cn(
        "text-white py-3 text-xl md:text-sm lg:text-xl w-full hover:text-black",
        "bg-gray-800/20 ",
        "border-b-2 border-zinc-700 hover:shadow-lg hover:shadow-zinc-500 ",
        "hover:rounded-xl w-full h-fit",
        "transition-all duration-150 ",
        "flex justify-start gap-4"
      )}
      onClick={onTap}
    >
      {children}
    </Button>
  );
};

export const DashboardNav = async ({
  className,
  userName,
}: {
  className?: string;
  userName: string;
}) => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <DashboardNavBtn>
        <LayoutPanelTop />
        <Link href="/Templates">Templates</Link>
      </DashboardNavBtn>
      <DashboardNavBtn>
        <Book />
        <Link href="/JobDescriptions">Job Discription</Link>
      </DashboardNavBtn>
      <DashboardNavBtn>
        <HardDriveUpload />
        <Link href="/New/jsonResume">upload Resume</Link>
      </DashboardNavBtn>
      <DashboardNavBtn>
        <Cpu />
        <Link href="/Payment">Price</Link>
      </DashboardNavBtn>

      <Seperator className="my-4 mb-8 mt-auto" />

      <Button className="w-full bg-gray-700/30 shadow-md border border-gray-700 rounded-lg  text-white/60 hover:bg-gray-700/30 flex justify-start gap-4 p-6 cursor-pointer">
        <div className="relative w-8 h-8 overflow-hidden rounded-full bg-slate-600 ">
          <div className="absolute z-10">
            <UserButton
              afterSignOutUrl="/sign-in"
              afterSwitchSessionUrl="/Dashboard"
              //   defaultOpen={true}
            />
          </div>
          <div className="absolute top-0 left-0 w-3 h-3 translate-x-[0.5rem] translate-y-1 bg-black rounded-full  face"></div>
          <div className="absolute top-0 left-0 w-6 h-6 translate-x-1 translate-y-3 bg-black rounded-full "></div>
        </div>
        <span className="text-lg">{userName ? userName : "User"}</span>
      </Button>
      <Button
        className="w-full bg-gray-700/30 hover:bg-gray-500/50 shadow-md border border-gray-700 rounded-lg  text-white/60 hover:text-gray-300 flex justify-start gap-4 p-6 cursor-pointer"
        onClick={() => signOut(() => router.push("/"))}
      >
        <DoorClosed />
        <span className="text-lg">Logout</span>
      </Button>
    </div>
  );
};

export const ResumeSectionShowCase = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
}) => {
  return (
    <div className={cn("w-full fc gap-2 ", className)}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <Seperator className=" mb-1 opacity-20 " />
      <div className="flex flex-row flex-wrap gap-2 w-full ">{children}</div>
    </div>
  );
};

// card

export default function ResumeCard({
  id,
  pdfItself,
  creaatedAt,
}: {
  id: string;
  pdfItself: string;
  creaatedAt: Date;
}) {
  const [showAction, setShowAction] = React.useState<boolean>(false);

  return (
    <motion.div
      key={id}
      className={
        "border-b shadow-lg shadow-gray-900 border-gray-700 p-1 px-2 bg-gray-700/30 flex flex-col rounded-md gap-2 cursor-pointer"
      }
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowAction(!showAction)}
    >
      <Image
        src={pdfItself as string}
        height={200}
        width={150}
        alt="pdf image"
        className="group-hover:invert h-30 w-30 rounded-md"
      />
      <div className="flex flex-row justify-between">
        <div className="text-white/50">{format(creaatedAt, "dd-MM-yyyy")}</div>
        {/* three dots */}
        <DropdownMenu open={showAction} onOpenChange={setShowAction}>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal className="opacity-70 w-6 mx-2 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="w-full flex flex-row gap-2"
                onClick={() => {
                  // download pdf 
                  // implement needed mutation to handle that
                }}
              >
                <Download />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem
                className="w-full flex flex-row gap-2"
                disabled={false}
              >
                <PencilRuler />
                Edit
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
