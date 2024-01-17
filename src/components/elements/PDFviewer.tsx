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
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

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
    <motion.div layout className="fc glass gap-2 h-full w-1/2 group">
      {/* isFetching : {`${isRefetching} ${status} `} */}
      <div className="fr justify-between items-center w-full relative">
        <div className="opacity-80">{state !== "idle" ? state : ""}</div>
        <div className="text-xl absolute -translate-x-1/2 left-[50%]">
          Resume
        </div>
        <div className="opacity-80">{enriched ? "ATS Score: 8" : ""}</div>
      </div>
      <div className="flex-1 justify-center fr gap-2">
        <motion.div layout className="flex-1">
          {/* flex justify-center */}
          <div className="h-full border border-green-500 flex items-center justify-center  relative ">
            {/* {isLoading && (
              <div className="w-full fc fcc ">
                <Loadingstate />
              </div>
            )}
            {isError && <div className="w-full fc fcc">{error.toString()}</div>} */}
            {dataArray && dataArray.length > 0 && (
              // <ZoomerImage
              // <AspectRatio ratio={1.5 / 1} className="border border-green-300 h-full flex justify-center">
              <Image
                src={dataArray[0]}
                alt={"autogenrated resume image"}
                width={400}
                height={600}
                className="rounded-md shadow-xl border aspect-[1/2] max-h-[10em] max-w-full object-cover border-green-300 "
                // w-fit
                // className="rounded-md shadow-xl border border-green-300 h-full w-full  object-contain "
              />
              // </AspectRatio>
            )}
            {/* {dataArray && dataArray.length > 0 && (
              <div className="rounded-md shadow-xl bg-red-50 z-10 h-full w-full absolute top-0 opacity-25 left-6 scale-95" />
            )} */}
          </div>
        </motion.div>
        <div className="border hidden group-hover:flex w-[10%] bg-green-50">
          side pannel{" "}
        </div>
      </div>
      {/* <div className="flex-1 border border-greem-600 overflow-hidden"></div> */}
    </motion.div>
  );
}

export default PDFviewer;
