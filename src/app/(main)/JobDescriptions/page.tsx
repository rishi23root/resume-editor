import JobDiscriptionTemplateShowcase from "@/components/pageSpecific/jobDes/jobDisShowCase";
import JobSearch from "@/components/pageSpecific/jobDes/jobSearch";
import { PageProps } from "@/types/utils";

export default async function JobDescriptionsPage(props: PageProps) {
  // const { stringifiedData, privateData } = await useParamParser(
  //   "/JobDescriptions",
  //   props.searchParams
  // );
  // console.log("form jobDes: ", stringifiedData, privateData);

  const jobId = (props.searchParams?.jobId as number) || 1;

  return (
    <div className="w-full fcc fc">
      <JobSearch />
      <JobDiscriptionTemplateShowcase
        jobId={jobId}
        searchParam={props.searchParams}
      />
    </div>
  );
}
