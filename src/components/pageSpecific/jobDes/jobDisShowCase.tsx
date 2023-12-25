import { serverAPI } from "@/serverTRPC/serverAPI";
import { Suspense } from "react";
import Card from "./jobCard";
import { Button } from "@/components/ui/button";
import { urlWithAddedParams } from "@/utils/paramHandeler";
import { searchParamType } from "@/types/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";

const JobDiscriptionTemplateShowcase = async ({
  jobId,
  searchParam,
}: {
  jobId: number;
  searchParam: searchParamType;
}) => {
  console.log("jobIdData component");

  // console.log(jobId, typeof jobId); // 1 'number' but returning `1 'string'`
  const jobIdData = await serverAPI.jobDis.byId({
    jobId: parseInt(jobId.toString()),
  });
  // console.log(jobIdData);
  const redirectPage = searchParam.redirectPage as string;
  const toRedirectUrl = redirectPage
    ? urlWithAddedParams(
        redirectPage,
        searchParam,
        { jobId: jobId },
        { procegure: 4 }
      )
    : urlWithAddedParams(
        "/Templates",
        searchParam,
        { jobId: jobId },
        { procegure: 2 }
      );

  return (
    <>
      {/* item cards */}
      <div className="w-full h-full fc gap-2 glass pt-16">
        <div className="flex-1 fr flex-wrap w-full h-full gap-6 justify-center">
          {/* render element of image of templates */}
          <Suspense fallback={<>loading resume template for this job..</>}>
            {jobIdData.templates.map((item) => {
              return (
                <Card
                  key={item.title}
                  jobId={jobId}
                  templateName={item.title}
                  templateData={jobIdData}
                />
              );
            })}
          </Suspense>
        </div>
        <div className="w-full fcc">
          <Button
            className={cn(
              "p-6 my-2 text-2xl capitalize bg-blue-500 border rounded-md m-auto text-white text-center w-full lg:w-[60%] ",
              "transition ease-in-out delay-150", //animate
              "hove:bg-blue-600 hover:shadow-lg hover:rounded-lg hover:shadow-zinc-500 hover:text-black"
            )}
          >
            <Link href={toRedirectUrl} className="w-full">
              Continue with &nbsp;
              <span className="bold italic">{jobIdData.title}</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default JobDiscriptionTemplateShowcase;
