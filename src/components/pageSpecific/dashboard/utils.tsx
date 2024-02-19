"use client";

import Seperator from "@/components/pageSpecific/Seperator";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import useRedirectHandler from "@/hooks/redirectionHandlers";
import { cn } from "@/lib/utils";
import { trpc } from "@/serverTRPC/client";
import { resumeDataprops } from "@/types/builder";
import { resumeTemplates } from "@/types/templates";
import { UserButton, useClerk } from "@clerk/nextjs";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Book,
  Cpu,
  DoorClosed,
  Download,
  HardDriveUpload,
  LayoutPanelTop,
  MoreHorizontal,
  PencilRuler,
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
        "text-white py-3 text-lg md:text-sm text-left w-full hover:text-black",
        "bg-gray-800/40 leading-0 ",
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
      <Link className="w-full " href="/Templates">
        <DashboardNavBtn>
          <LayoutPanelTop className="w-10 " />
          Templates
        </DashboardNavBtn>
      </Link>
      <Link className="w-full " href="/JobDescriptions">
        <DashboardNavBtn>
          <Book className="w-10  " />
          Job Discription
        </DashboardNavBtn>
      </Link>
      <Link className="w-full" href="/New/jsonResume">
        <DashboardNavBtn>
          <HardDriveUpload className="w-10 " />
          upload Resume
        </DashboardNavBtn>
      </Link>
      <Link className="w-full" href="/Payment">
        <DashboardNavBtn>
          <Cpu className="w-10" />
          Price
        </DashboardNavBtn>
      </Link>

      <Seperator className="my-4 mb-8 mt-auto" />

      <Button className="w-full bg-gray-700/30 shadow-md border border-gray-700 rounded-lg  text-white/60 hover:bg-gray-700/30 flex justify-start gap-4 p-6 cursor-pointer">
        <div className="relative w-8 h-8 overflow-hidden rounded-full bg-slate-600 ">
          <div className="absolute z-10">
            <UserButton
              afterSignOutUrl="/sign-in"
              afterSwitchSessionUrl="/dashboard"
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
  title: string | React.ReactNode;
}) => {
  return (
    <div className={cn("w-full fc gap-2 cursor-pointer h-fit", className)}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <Seperator className=" mb-1 opacity-20 " />
      <div className="flex flex-row flex-wrap gap-2 w-full ">{children}</div>
    </div>
  );
};

// card
export default function ResumeCard({ resume }: { resume: resumeDataprops }) {
  // id: string;
  // pdfItself: string;
  // creaatedAt: Date;
  const { id, pdfItself, creaatedAt } = resume;
  const [showAction, setShowAction] = React.useState<boolean>(false);
  const { toast } = useToast();
  const { urlWithAddedParams } = useRedirectHandler();
  const router = useRouter();

  // using created at find if active or not
  const isActive =
    new Date().getTime() - creaatedAt.getTime() <= 30 * 24 * 60 * 60 * 1000;

  const editLink = urlWithAddedParams(
    "/Builder",
    {
      jobId: resume.jobId,
      payId: resume.payId.toString() as string,
      templateName: resume.template as string as resumeTemplates | undefined,
    },
    {
      jsonDataId: resume.id,
      procegure: 4,
    }
  );

  const downloadPDF = trpc.builder.getPDFByResumeId.useMutation({
    onSuccess: async (data) => {
      // console.log("downloaded pdf: ", data);
      // now  we got base64 encoded pdf file decode it and save it as pdf file
      const blob = new Blob([Buffer.from(data, "base64")], {
        type: "application/pdf",
      });

      saveAs(blob, `resume_${format(new Date(), "dd-MM-yyyy")}.pdf`);

      toast({
        variant: "default",
        title: "PDF downloaded 👍 ",
      });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "unable to download pdf try again later",
      });
      console.log(err);
    },
    onMutate: () => {
      toast({
        variant: "default",
        title: "Requesting for PDF download :)",
      });
      setTimeout(() => {
        toast({
          variant: "default",
          title: "PDF will download shortly ",
          duration: 20000,
        });
      }, 500);
    },
  });

  const deleteResume = trpc.builder.delByResumeId.useMutation({
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: "Resume deleted 👍",
      });
      router.refresh();
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "unable to delete resume try again later",
      });
      console.log(err);
    },
    onMutate: () => {
      toast({
        variant: "default",
        title: "Requesting for resume delete :)",
      });
      setTimeout(() => {
        toast({
          variant: "default",
          title: "Resume will delete shortly ",
          duration: 20000,
        });
      }, 500);
    },
  });

  return (
    <DropdownMenu open={showAction} onOpenChange={setShowAction}>
      <DropdownMenuTrigger asChild>
        <motion.div
          key={id}
          className={
            "cursor-pointer border-b shadow-lg shadow-gray-900 border-gray-700 p-1 px-2 bg-gray-700/30 flex flex-col rounded-md gap-2 max-h-[15em]"
          }
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src={pdfItself as string}
            height={200}
            width={150}
            alt="pdf image"
            className="group-hover:invert h-30 w-30 rounded-md"
          />
          <div className="flex flex-row justify-between">
            <div className="text-white/50">
              {format(creaatedAt, "dd-MM-yyyy")}
            </div>
            {/* three dots */}
            <MoreHorizontal
              className={cn(
                "opacity-70 w-6 mx-2 duration-50",
                showAction && "rotate-90 translate-x-1/2"
              )}
            />
          </div>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-900 shadow-md ">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="w-full flex flex-row gap-2 cursor-pointer"
            onClick={() => {
              // download pdf
              downloadPDF.mutate({ resumeId: id });
            }}
          >
            <Download /> Download
          </DropdownMenuItem>
          {isActive && (
            <DropdownMenuItem className="w-full flex flex-row gap-2">
              <Link href={editLink} className="w-full flex flex-row gap-2">
                <PencilRuler /> Edit
              </Link>
            </DropdownMenuItem>
          )}
          {/* delete  */}
          <DropdownMenuItem
            className="w-full flex flex-row gap-2 cursor-pointer group"
            onClick={() => {
              // delete resume
              const confirm = window.confirm("Delete resume : " + id);
              if (confirm) {
                // delete resume
                deleteResume.mutate({ resumeId: id });
              }
            }}
          >
            <DoorClosed className="group-hover:text-red-500/80 transition-all" />
            <span className="group-hover:text-red-500/80 transition-all">
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
