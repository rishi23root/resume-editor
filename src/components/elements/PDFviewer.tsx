// working under issue #35

// this component have single task to show pdf file in the browser
// using react-pdf library
// take pdf file as props and show it in the browser or take id to request pdf file from server

"use client";

import { trpc } from "@/serverTRPC/client";
import { Loadingstate } from "../Fallbacks";
import { ZoomerImage } from "../custom/ImageMagnify";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function PDFviewer({
  templateName,
  resumeId,
  enriched,
  state,
}: {
  enriched: boolean;
  state: string;
  templateName: string;
  resumeId: string;
}) {
  const [dataArray, setDataArray] = useState<string[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>();
  const { toast } = useToast();
  const { data, isLoading, isError, error, status, isFetching, isRefetching } =
    trpc.builder.generatePDF.useQuery(
      {
        id: resumeId,
        templateName: templateName,
      },
      {
        // queryKey: [
        //   "builder.generatePDF",
        //   { id: resumeId, templateName: templateName },
        // ],
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        // update ui instantly on invalidateQueries
      }
    );

  // show error if any
  useEffect(() => {
    if (data?.error) {
      console.log(data?.error);
      toast({
        variant: "destructive",
        title: "Error while generating preview",
        description: data.error,
      });
    } else {
      setDataArray(data?.images || []);
      // setPdfFile(data?.pdfFile || []);
      // console.log("updated", data?.pdfFile);
    }
    console.log("updated");
  }, [data]);

  // api request to get the pdf by id and update it on event
  // api request to get the pdf ats score

  // setup model view here on click and mobile display

  return (
    <div className="items-center w-full md:w-[60%] fc glass md:h-full h-1/2 gap-2">
      {/* isFetching : {`${isRefetching} ${status} `} */}
      <div className="fr justify-between items-center w-full relative">
        <div className="opacity-80">{state !== "idle" ? state : ""}</div>
        <div className="text-xl absolute -translate-x-1/2 left-[50%]">
          Resume
        </div>
        <div className="opacity-80">{enriched ? "ATS Score: 8" : ""}</div>
      </div>
      <div className="flex align-middle border h-fit gap-2">
        {isLoading && (
          <div className="w-full fc fcc ">
            <Loadingstate />
          </div>
        )}
        {isError && <div className="w-full fc fcc">{error.toString()}</div>}
        <motion.div layout className="w-[85%] relative">
          {dataArray && dataArray.length > 0 && (
            <ZoomerImage
              src={dataArray[0]}
              alt={"autogenrated resume image"}
              width={200}
              height={200}
              className="h-full rounded-md shadow-xl"
            />
          )}
          {dataArray && dataArray.length > 1 && (
            <div className="rounded-md shadow-xl bg-red-50 z-10 h-full w-full absolute top-0 opacity-25 left-6 scale-95" />
          )}
        </motion.div>
        <div className="border flex-1 bg-green-50"></div>
      </div>
      {/* <div className="flex-1 border border-greem-600 overflow-hidden"></div> */}
    </div>
  );
}

export default PDFviewer;
