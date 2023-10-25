"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRedirectHandler from "@/hooks/redirectionHandlers";
import { keyValue } from "@/types/utils";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const JobSearch = ({ jobIdWithName }: { jobIdWithName: keyValue<string> }) => {

  const router = useRouter();
  const { urlWithAddedParams } = useRedirectHandler();

  const updateSelection = async (e: any) => {
    router.push(urlWithAddedParams({ jobId: e }));
  };

  return (
    <Suspense>
      <div className="h-[3em] md:h-[4em] z-10 md:w-[50vw] w-[90%] ">
        <Select defaultValue={"1"} onValueChange={updateSelection}>
          <SelectTrigger className="p-8 m-2 text-[1.7xl] md:text-2xl md:m-4 rounded-3xl">
            <SelectValue placeholder="JOB Title" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(jobIdWithName).map(([key, value]) => {
              return (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </Suspense>
  );
};

export default JobSearch;
