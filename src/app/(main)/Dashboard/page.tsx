import Seperator from "@/components/pageSpecific/Seperator";
import ResumeCard, {
  DashboardNav,
  ResumeSectionShowCase,
} from "@/components/pageSpecific/dashboard/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { serverAPI } from "@/serverTRPC/serverAPI";
import { PageProps } from "@/types/utils";
import useParamParser from "@/utils/paramHandeler";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage(props: PageProps) {
  // const { stringifiedData, privateData } = await useParamParser(
  //   "/Dashboard",
  //   props.searchParams
  // );
  // console.log("from dashboard: ", stringifiedData, privateData);
  const user = await currentUser();
  const userDBid = user?.privateMetadata.userDBid;

  const allResume = await serverAPI.builder.getAllResume({
    userId: userDBid as string,
  });

  // filter all without image and generate pdf for them
  // const ResumesWithoutPDF = allResume.filter(
  //   ({ pdfItself }) => pdfItself == null
  // );
  // console.log(ResumesWithoutPDF);

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

  // filter out all the active resume which are paid and created in last 30 days
  const activeResumes = allResumeWithData.filter(({ creaatedAt }) => {
    const date = new Date(creaatedAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = diff / (1000 * 3600 * 24);
    return diffDays <= 30;
  });

  // rest all resume which are not active are old resume and we will show them in all resume section

  console.log(allResumeWithData.length, activeResumes.length);

  // check if user is signed in if not then redirect to login pages else redirect to dashboard
  return (
    // make whole page with 10/12 width and center it on above medium screens
    <div className="w-full gap-4 md:h-[42rem] md:fr fc">
      {/* dashboard nav */}
      <div className="w-full md:w-4/12 lg:w-3/12 hidden lg:flex fc glass md:h-full h-2/6 gap-2 ">
        <Link href="/New">
          <Button
            className={cn(
              "gap-2 w-full",
              "p-4 py-6 shadow-lg rounded-xl leading-tight hover:text-black hover:shadow-zinc-500",
              "text-white text-xl md:text-sm lg:text-xl",
              "group bg-[#3383FF]"
            )}
          >
            <Image
              src={"/svgs/addNew.svg"}
              height={30}
              width={30}
              alt="this is add"
              className="group-hover:invert"
            />
            <div className="">New Resume</div>
          </Button>
        </Link>

        <Seperator className="my-4 mb-8 " />

        <DashboardNav
          className="flex-1 items-start"
          userName={user?.firstName as string}
        />
      </div>
      {/* all resume showcase btn */}
      <div className="w-full gap-6 md:h-[42rem] flex flex-col  glass h-full -z-10">
        <ResumeSectionShowCase title="Active Resume">
          {activeResumes.map(({ id, pdfItself, creaatedAt }) => (
            <ResumeCard
              key={id}
              id={id}
              pdfItself={pdfItself as string}
              creaatedAt={creaatedAt}
            />
          ))}
        </ResumeSectionShowCase>
        <ResumeSectionShowCase title="All Resume">
          {allResumeWithData.map(({ id, pdfItself, creaatedAt }) => (
            <ResumeCard
              key={id}
              id={id}
              pdfItself={pdfItself as string}
              creaatedAt={creaatedAt}
            />
          ))}
          {allResumeWithData.map(({ id, pdfItself, creaatedAt }) => (
            <ResumeCard
              key={id}
              id={id}
              pdfItself={pdfItself as string}
              creaatedAt={creaatedAt}
            />
          ))}
        </ResumeSectionShowCase>
      </div>
      {/* all active currently editing resume show case */}
      {/* {activeRecentlyRendering.length == 0 && (
        <div className="w-full md:w-4/12 lg:w-3/12 fc glass md:h-full h-2/6 gap-2 ">
          <Link href="/New">
            <Button
              className={cn(
                "gap-2 w-full",
                "p-4 py-6 shadow-lg rounded-xl leading-tight hover:text-black hover:shadow-zinc-500",
                "text-white text-xl md:text-sm lg:text-xl",
                "group bg-blue-600"
              )}
            >
              <Image
                src={"/svgs/addNew.svg"}
                height={30}
                width={30}
                alt="this is add"
                className="group-hover:invert"
              />
              <div className="">New Resume</div>
            </Button>
          </Link>

          <Seperator className="my-4 mb-8 " />

          <div className="fc fcc gap-4">
            <Button
              className={cn(
                "p-6 bg-transparent text-white text-xl md:text-sm lg:text-xl w-full hover:text-black",
                "border-b-2 border-zinc-700 shadow-lg hover:shadow-zinc-500 ",
                "hover:rounded-xl",
                "transition-all duration-150"
              )}
            >
              Templates
            </Button>
            <Button
              className={cn(
                "p-6 bg-transparent text-white text-xl md:text-sm lg:text-xl w-full hover:text-black",
                "border-b-2 border-zinc-700 shadow-lg hover:shadow-zinc-500 ",
                "hover:rounded-xl",
                "transition-all duration-150"
              )}
            >
              Templates
            </Button>
            <Button
              className={cn(
                "p-6 bg-transparent text-white text-xl md:text-sm lg:text-xl w-full hover:text-black",
                "border-b-2 border-zinc-700 shadow-lg hover:shadow-zinc-500 ",
                "hover:rounded-xl",
                "transition-all duration-150"
              )}
            >
              Templates
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
}

{
  /* <div className="flex justify-between items-center">
        <Link href="/New">
          <Button
            className={cn(
              "gap-2 w-full",
              "p-4 py-6 shadow-lg rounded-xl leading-tight hover:text-black hover:shadow-zinc-500",
              "text-white text-xl md:text-sm lg:text-xl",
              "group bg-blue-600"
            )}
          >
            <div className="">New Resume</div>
            <Image
              src={"/svgs/addNew.svg"}
              height={30}
              width={30}
              alt="this is add"
              className="group-hover:invert"
            />
          </Button>
        </Link>
      </div> */
}
