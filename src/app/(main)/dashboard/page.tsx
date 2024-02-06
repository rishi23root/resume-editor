import Seperator from "@/components/pageSpecific/Seperator";
import { DashboardMain } from "@/components/pageSpecific/dashboard/ResumeSectionShowCase";
import { DashboardNav } from "@/components/pageSpecific/dashboard/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { serverAPI } from "@/serverTRPC/serverAPI";
import { PageProps } from "@/types/utils";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function DashboardPage(props: PageProps) {
  // const { stringifiedData, privateData } = await useParamParser(
  //   "/dashboard",
  //   props.searchParams
  // );
  // console.log("from dashboard: ", stringifiedData, privateData);
  const user = await currentUser();
  const userDBid = user?.privateMetadata?.userDBid;

  const allResume = await serverAPI.builder.getAllResume({
    userId: userDBid as string,
  });

  // requst server to generate pdf for them parallely using promise.all and update the the current variable
  const allResumeWithData = await Promise.all(
    allResume.map(async (data, index) => {
      const { id, template, pdfItself } = data;
      if (pdfItself == null) {
        const generatedImage = await serverAPI.builder.generatePDF({
          resumeId: id,
          templateName: template,
        });
        return { ...data, pdfItself: generatedImage.images[0] };
      }
      return data;
    })
  );

  return (
    <div className="w-full gap-4 xl:h-[42rem] md:fr fc">
      {/* dashboard nav */}
      <div className="w-full md:w-4/12 lg:w-3/12 hidden xl:flex fc glass md:h-full h-2/6 gap-2 ">
        <Link href="/New">
          <Button
            className={cn(
              "gap-2 w-full",
              "p-4 py-6 shadow-lg rounded-xl leading-tight hover:text-black hover:shadow-zinc-500",
              "text-white text-lg",
              "group bg-[#3383FF]"
            )}
          >
            <Image
              src={"/svgs/addNew.svg"}
              height={20}
              width={20}
              alt="this is add"
              className="group-hover:invert"
            />
            <div className="flex-1">New Resume</div>
          </Button>
        </Link>

        <Seperator className="my-4 mb-8 " />

        <DashboardNav
          className="flex-1 items-start"
          userName={user?.firstName as string}
        />
      </div>
      {/* all resume showcase btn */}

      <div className="w-full gap-6 flex flex-col glass h-full">
        <Suspense>
          <DashboardMain allResumeWithData={allResumeWithData} />
        </Suspense>
      </div>
    </div>
  );
}
