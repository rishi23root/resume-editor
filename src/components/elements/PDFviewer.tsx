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
import { ArrowDownFromLine, RefreshCcw } from "lucide-react";

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
    <motion.div layout className="fc glass gap-4 h-full w-full group">
      {/* isFetching : {`${isRefetching} ${status} `} */}
      <div className="fr justify-between items-center w-full relative">
        <div className="opacity-80">{state !== "idle" ? state : ""}</div>
        <div className="text-xl absolute -translate-x-1/2 left-[50%]">
          Resume
        </div>
        <div className="opacity-80">{enriched ? "ATS Score: 8" : ""}</div>
      </div>
      <motion.div layout className="flex-1 justify-center fr gap-2 ">
        <motion.div
          layout
          className="flex-1  min-w-[50%] flex justify-center items-center flex-row"
        >
          {/* flex justify-center */}
          <div className="h-full flex items-center justify-center  relative ">
            {isLoading && (
              <div className="w-full fc fcc ">
                <Loadingstate />
              </div>
            )}
            {isError && <div className="w-full fc fcc">{error.toString()}</div>}
            {dataArray && dataArray.length > 0 && (
              <ZoomerImage
                src={dataArray[0]}
                alt={"autogenrated resume image"}
                width={400}
                height={600}
                className="rounded-md shadow-xl object-cover w-[30em] "
              />
            )}
            {dataArray && dataArray.length > 1 && (
              <div className="-z-10 bg-blue-500/15 scale-95 left-8 w-full h-full absolute rounded-md shadow-xl" />
            )}
          </div>
        </motion.div>
        <motion.div
          layout
          className="border hidden group-hover:flex w-[10%] glass flex-col justify-top gap-2 items-center"
        >
          <div className="w-full text-center mb-4">Actions</div>
          <ActionBtn>
            <ArrowDownFromLine />
          </ActionBtn>
          <ActionBtn>
            <RefreshCcw />
          </ActionBtn>
          {/* action required
          1. download
          2. refresh
          4. request new pdf file
          3. request schema file
          */}
          <div className="w-full text-center mb-4 item-end">Actions</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ActionBtn({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <div className="border p-4 shadow-md hover:bg-slate-500 rounded-md shadow-white/50">
      
      {children}
    </div>
  );
}

export default PDFviewer;
