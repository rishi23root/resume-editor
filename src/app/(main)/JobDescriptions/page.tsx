import JobDiscriptionTemplateShowcase from "@/components/pageSpecific/jobDes/jobDisShowCase";
import JobSearch from "@/components/pageSpecific/jobDes/jobSearch";
import { PageProps } from "@/types/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build.Your.Resume - Job Descriptions",
  description:
    "Craft compelling resumes with Build.Your.Resume's expert job descriptions guide. Tailored for fresher job seekers, explore optimal formats, ATS insights, and templates to ace your job applications. Start optimizing your resume today!",
  keywords: [
    "summary for resume for freshers",
    "how to make resume for freshers",
    "what is ats resume",
    "ats resume checker",
    "fast job",
    "job card",
    "mgnrega job card",
    "student first job resume format for freshers",
    "resume for freshers",
    "fresher resume",
    "fresher resume format",
    "fresher resume template",
    "fresher resume templates",
    "fresher resume sample",
  ],
};

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
