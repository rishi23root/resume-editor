import JobDiscriptionTemplateShowcase from "@/components/pageSpecific/jobDes/jobDisShowCase";
import JobSearch from "@/components/pageSpecific/jobDes/jobSearch";
import { PageProps, keyValue } from "@/types/utils";
import useParamParser from "@/utils/paramHandeler";

const getSeleteDiscriptionData = async () => {
  const response = await fetch(process.env.FRONTEND + "/api/jobDescription/");
  const data = await response.json();
  return data as keyValue<string>;
};

export default async function JobDescriptionsPage(props: PageProps) {
  const { stringifiedData, privateData } = await useParamParser(
    "/JobDescriptions",
    props.searchParams
  );
  console.log("form jobDes: ", stringifiedData, privateData);

  const jobId = (props.searchParams?.jobId as string) || "1";

  const jobIdWithName = await getSeleteDiscriptionData();
  return (
    <div className="w-full fcc fc">
      <JobSearch jobIdWithName={jobIdWithName} />
      <JobDiscriptionTemplateShowcase jobId={jobId} />
    </div>
  );
}
