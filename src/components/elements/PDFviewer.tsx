// working under issue #35

// this component have single task to show pdf file in the browser
// using react-pdf library
// take pdf file as props and show it in the browser or take id to request pdf file from server

"use client";

import { pdfAndFromStatus } from "@/types/builder";

import { ZoomerImage } from "@/components/custom/ImageMagnify";
import RenderCompleted from "@/hooks/RenderCompleted";
import { trpc } from "@/serverTRPC/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownFromLine,
  FileJson2,
  FileText,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Loadingstate } from "../Fallbacks";
import { useToast } from "../ui/use-toast";

import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import { useRouter } from "next/navigation";
import { ActionBtn, ModelComponent } from "../pageSpecific/builder/uitls";
import { searchParamType } from "@/types/utils";

function PDFviewer({
  templateName,
  resumeId,
  enriched,
  state,
  generatedPDf,
  searchParams,
}: {
  enriched: boolean;
  templateName: string;
  resumeId: string;
  state: string;
  // update it to make this element type safe return type of usemutation
  generatedPDf: any;
  searchParams: searchParamType;
}) {
  const [showModel, setShowModel] = useState(false);
  const [dataArray, setDataArray] = useState<string[]>([]);
  const ifRendered = RenderCompleted();
  const { toast } = useToast();
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    error,
    mutate: regeneratePdfImage,
  } = generatedPDf;

  // deleting pdf mutation
  const deleteResume = trpc.builder.delByResumeId.useMutation({
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Resume deleted",
      });
      router.push("/Dashboard");
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "unable to del resume try again later",
      });
      console.log(err);
    },
  });

  // download pdf mutation
  const downloadPDF = trpc.builder.getPDFByResumeId.useMutation({
    onSuccess: async (data) => {
      // console.log("downloaded pdf: ", data);
      // now  we got base64 encoded pdf file decode it and save it as pdf file
      const blob = new Blob([Buffer.from(data, "base64")], {
        type: "application/pdf",
      });

      saveAs(blob, `resume_${format(new Date(), "dd-MM-yyyy")}.pdf`);

      toast({
        variant: "default",
        title: "PDF downloaded 👍 ",
      });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "unable to download pdf try again later",
      });
      console.log(err);
    },
    onMutate: () => {
      toast({
        variant: "default",
        title: "Requesting for PDF download :)",
      });
      setTimeout(() => {
        toast({
          variant: "default",
          title: "PDF will download shortly ",
          duration: 20000,
        });
      }, 500);
    },
  });

  // download pdf schema
  const downloadSchema = trpc.builder.getSchemaByResumeId.useMutation({
    onSuccess: (data) => {
      // console.log("downloaded schema: ", data.basics.name);
      // save the data into a file with name username_resumeId.json and download it
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });

      saveAs(
        blob,
        `${data.basics.name.replace(" ", ".")}_${format(
          new Date(),
          "dd-MM-yyyy"
        )}.json`
      );

      toast({
        variant: "default",
        title: "Schema downloaded 👍 ",
      });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Unable to download schema try again later",
      });
      console.log(err);
    },
    onMutate: () => {
      toast({
        variant: "default",
        title: "Requesting for schema download :)",
      });
    },
  });

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

  function DownloadPDFFromServer() {
    console.log(resumeId);
    // downloadPDF();
    downloadPDF.mutate({ resumeId, templateName });
  }
  function DownloadSchemaFromServer() {
    console.log(resumeId);
    downloadSchema.mutate({ resumeId });
  }
  async function delResumeAndRedirect() {
    // delete the resume from the server
    // show notification of deleting
    // onsuccess redirect to the dashboard
    if (confirm("Deleting resume: " + resumeId)) {
      deleteResume.mutate({ resumeId });
    }
  }

  // update to get the ats score and other discription data for full and enrich view of the resume
  // need to update ats score and get data for the model and refresh it when model opens

  return (
    <motion.div layout className="fc glass gap-4 h-full w-full group flex-1">
      {/* isFetching : {`${isRefetching} ${status} `} */}
      <div
        className="fr justify-between items-center w-full h-4 relative cursor-pointer"
        onClick={() => {
          setShowModel(!showModel);
        }}
      >
        <div className="opacity-80 capitalize">
          {state !== "idle" ? state : ""}
        </div>
        <div className="text-xl absolute -translate-x-1/2 -translate-y-1/2 left-[50%] h-full">
          Resume
        </div>
        <div className="opacity-80">{enriched ? "ATS Score: 8" : ""}</div>
      </div>
      <motion.div
        layout
        className="flex-1 justify-center fr gap-2 overflow-hidden"
      >
        <motion.div className="flex-1 min-w-[50%] w-full flex justify-center items-center flex-row">
          {/* flex justify-center */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div className="h-full flex items-center justify-center  relative ">
              {isLoading && (
                <motion.div
                  className="w-full fc fcc "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duraton: 0.1 } }}
                  exit={{ opacity: 0 }}
                >
                  <Loadingstate />
                </motion.div>
              )}
              {isError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duraton: 0.1 } }}
                  exit={{ opacity: 0 }}
                  className="w-full fc fcc"
                >
                  {error.toString()}
                </motion.div>
              )}
              {!isLoading && dataArray && dataArray.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duraton: 0.3 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duraton: 0.3, delay: 2 },
                  }}
                >
                  <ZoomerImage
                    src={dataArray[0]}
                    alt={"autogenrated resume image"}
                    width={400}
                    height={600}
                    className="rounded-md shadow-xl object-cover w-[30em] "
                  />
                </motion.div>
              )}
              {!isLoading && dataArray && dataArray.length > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duraton: 0.3, delay: 0.2 },
                  }}
                  exit={{ opacity: 0, transition: { duraton: 0.3 } }}
                  className="-z-10 bg-blue-500/15 scale-95 left-8 w-full h-full absolute rounded-md shadow-xl"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <motion.div
          layout
          className="rounded-md transition-[width] duration-500 ease-in-out opacity-0 w-0 group-hover:opacity-100 group-hover:w-[25%] flex flex-col justify-top gap-4 p-2 px-6"
        >
          <div className="w-full text-left mb-4 opacity-0 group-hover:opacity-70 duration-150 delay-300 capitalize text-lg ">
            Actions
          </div>
          <ActionBtn
            toolkitContent="download resume"
            onPress={DownloadPDFFromServer}
          >
            <ArrowDownFromLine className="scale-125" />
          </ActionBtn>
          <ActionBtn
            toolkitContent="refresh editor"
            onPress={() => {
              regeneratePdfImage({
                resumeId,
                templateName,
              });
            }}
          >
            <RefreshCcw className="scale-125" />
          </ActionBtn>
          <ActionBtn
            toolkitContent="download schema"
            onPress={DownloadSchemaFromServer}
          >
            <FileJson2 className="scale-125" />
          </ActionBtn>
          <ActionBtn
            toolkitContent="Detailed pdf view"
            // show modle with its data inside
            onPress={() => setShowModel(!showModel)}
          >
            <FileText className="scale-125" />
          </ActionBtn>
          <ActionBtn
            toolkitContent="delete this resume"
            onPress={delResumeAndRedirect}
          >
            <Trash2 className="scale-125 hover:text-red-400" />
          </ActionBtn>
          {/* <div className="w-full text-center mt-auto opacity-0 group-hover:opacity-100 duration-150 delay-300   ">
            Actions
          </div> */}
        </motion.div>
      </motion.div>
      {/* model conditionally rendered when needed only*/}
      {ifRendered && (
        <ModelComponent
          dataArray={dataArray}
          error={error}
          isError={isError}
          resumeId={resumeId}
          modelState={[showModel, setShowModel]}
          searchParams={searchParams}
        />
      )}
    </motion.div>
  );
}

export default PDFviewer;
