import { serverAPI } from "@/serverTRPC/serverAPI";
import { Suspense } from "react";
import Card from "./jobCard";

const JobDiscriptionTemplateShowcase = async ({ jobId }: { jobId: number }) => {
  // console.log(jobId, typeof jobId); // 1 'number' but returning `1 'string'`
  const jobIdData = await serverAPI.jobDis.byId({
    jobId: parseInt(jobId.toString()),
  });
  // console.log(jobIdData);

  return (
    <>
      {/* item cards */}
      <div className="flex flex-wrap w-full h-full gap-4 pt-16 border glass">
        {/* render element of image of templates */}
        <Suspense fallback={<>loading resume template for this job..</>}>
          {jobIdData.map((item) => (
            <Card key={item.title} jobId={jobId} templateData={item} />
          ))}
        </Suspense>
      </div>
    </>
  );
};

export default JobDiscriptionTemplateShowcase;
