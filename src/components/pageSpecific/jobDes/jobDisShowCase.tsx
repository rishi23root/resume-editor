"use client";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { templateArrayTypes } from "@/types/jobDescription";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Card from "./jobCard";

type Props = {
  jobId: string;
};

// todos
// update data intake from api
// use custom searchparams for use this template

const getTemplateData = async (
  jobId: string
): Promise<templateArrayTypes[]> => {
  try {
    const response = await fetch(`/api/jobDescription/${jobId}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch job description: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while fetching job description: ${error}`);
  }
};

const JobDiscriptionTemplateShowcase = ({ jobId }: Props) => {
  const [jobIdData, setJobIdData] = useState<templateArrayTypes[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    getTemplateData(jobId)
      .then((data) => {
        console.log("data fetched for: ", jobId);
        setJobIdData(data);
      })
      .catch((err) => {
        // console.log(err);
        setJobIdData([
          {
            title: "Error with Id",
            description: "Error with JobId or in request",
          },
        ]);

        // add toast for notification of failed job
        toast({
          variant: "destructive",
          title: "Error with fetching data",
          description: "Try again fresh",
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Dashboard {"->"}
            </ToastAction>
          ),
        });
      });
  }, [jobId]);

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
