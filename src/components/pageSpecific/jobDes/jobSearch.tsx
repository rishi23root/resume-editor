"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRedirectHandler from "@/hooks/redirectionHandlers";
import { trpc } from "@/serverTRPC/client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";


const JobSearch = () => {
  // const [jobIdWithName, setJobIdWithName] = useState<keyValue<string>>({});
  const router = useRouter();
  const { urlWithAddedParams } = useRedirectHandler();

  const {
    data: jobIdWithName,
    isError,
    isLoading,
  } = trpc.jobDis.all.useQuery(undefined, {
    // make it to never refetch the data from the server
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  const updateSelection = async (e: any) => {
    router.push(urlWithAddedParams({ jobId: e }));
  };

  useEffect(() => {
    if (isError) {
      // add error param to the url
      router.replace(
        urlWithAddedParams({ error: "unable to process the API request !" })
      );
    }
  }, [isError]);

  return (
    <Suspense>
      <div className="h-[3em] md:h-[4em] z-10 md:w-[50vw] w-[90%] ">
        <Select defaultValue={"1"} onValueChange={updateSelection}>
          <SelectTrigger className="p-8 m-2 text-[1.7xl] md:text-2xl md:m-4 rounded-3xl">
            <SelectValue placeholder="JOB Title" />
          </SelectTrigger>
          <SelectContent>
            {isLoading && <SelectItem value="1">Loading...</SelectItem>}
            {!isLoading &&
              jobIdWithName &&
              Object.entries(jobIdWithName).map(([key, value]) => {
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
