// working under issue #35
"use client";

import { ZoomerImage } from "@/components/custom/ImageMagnify";
import RenderCompleted from "@/hooks/RenderCompleted";
import { trpc } from "@/serverTRPC/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownFromLine,
  ChevronsDown,
  FileJson2,
  FileText,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import { Loadingstate } from "../Fallbacks";
import { useToast } from "../ui/use-toast";

import { searchParamType } from "@/types/utils";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import { useRouter } from "next/navigation";
import { ActionBtn, ModelComponent } from "../pageSpecific/builder/uitls";
import { UseTRPCMutationResult } from "@trpc/react-query/shared";
import { cn } from "@/lib/utils";
import { ResizablePanel } from "../pageSpecific/builder/customFormFields/sections/utils";

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
  generatedPDf: UseTRPCMutationResult<
    {
      error: string;
      images: string[];
    },
    any,
    any,
    unknown
  >;
  searchParams: searchParamType;
}) {
  const [showModel, setShowModel] = useState(false);
  const [dataArray, setDataArray] = useState<string[]>([]);
  const ifRendered = RenderCompleted();
  const { toast } = useToast();
  const router = useRouter();
  const [isInMobileViewAndVisible, setIsInMobileViewAndVisible] =
    useState<boolean>(true);

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

  // get ai base recommadations
  var getAiRecomandations = trpc.openai.getAtsAndRecommandation.useMutation();
  // const { data: aiData, isloading: isAiDataLoading } = getAiRecomandations;
  const { data: aiData, isLoading: isAiDataLoading } = getAiRecomandations;

  // for only firstLoad
  useEffect(() => {
    // generate pdf for the first time on load
    regeneratePdfImage({
      resumeId,
      templateName: searchParams.templateName as string,
    });
    if (enriched) {
      getAiRecomandations.mutate({
        resumeId,
      });
    }
  }, []);

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
    // console.log("updated");
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

  return (
    <motion.div
      layout
      className="fc glass gap-4  xl:h-full w-full lg:min-w-[45%] group xl:flex-1 relative"
    >
      <Suspense>
        <div
          className="fr justify-between items-center w-full h-4 relative cursor-pointer"
          onClick={() => {
            setShowModel(!showModel);
          }}
        >
          <div className="opacity-80 capitalize">
            {state !== "idle" ? state : ""}
          </div>
          <div className="hidden sm:block text-xl absolute -translate-x-1/2 -translate-y-1/2 left-[50%] h-full">
            Preview
          </div>
          <div className="opacity-80">
            {enriched
              ? "ATS Score: " +
                (isAiDataLoading ? "updating" : aiData?.atsScore)
              : ""}
          </div>
        </div>
        <ResizablePanel>
          <motion.div
            layout
            className={cn(
              "flex-1 justify-center flex flex-col sm:flex-row  gap-2 overflow-hidden",
              isInMobileViewAndVisible
                ? "h-auto max-h-[80vh] visible"
                : "h-1 invisible"
            )}
          >
            <motion.div className="flex min-w-[50%] w-full flex-1 justify-center items-center flex-row">
              {/* flex justify-center */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className={cn(
                    "h-full flex items-center justify-center relative ",
                    isInMobileViewAndVisible ? "visible" : "invisible"
                  )}
                >
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
                  {!isLoading &&
                    isInMobileViewAndVisible &&
                    dataArray &&
                    dataArray.length > 0 && (
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
                          zoomType="click"
                          className="rounded-md shadow-xl object-cover w-[100%] sm:w-[25em] lg:w-[30em]"
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
              className={cn(
                "rounded-md transition-[width] duration-500 ease-in-out xl:opacity-0 w-full sm:w-[25%] xl:w-0 group-hover:opacity-100 group-hover:w-[25%] pointer-events-none group-hover:pointer-events-auto flex flex-col justify-top gap-1 p-2 lg:px-6 ",
                isInMobileViewAndVisible ? "visible" : "invisible"
              )}
            >
              <div className="w-full text-center sm:text-left  sm:mb-4 xl:opacity-0 group-hover:opacity-70 duration-150 delay-300 capitalize text-lg ">
                Actions
              </div>
              {isInMobileViewAndVisible ? (
                <div className="flex flex-row sm:flex-col gap-4 item-center justify-center">
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
                    toolkitContent="download resume"
                    onPress={DownloadPDFFromServer}
                  >
                    <ArrowDownFromLine className="scale-125" />
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
                </div>
              ) : (
                ""
              )}
            </motion.div>
          </motion.div>
        </ResizablePanel>
        <div className="w-full xl:hidden h-3 group">
          <motion.div
            className={cn(
              "absolute w-full fcc bg-gray-300/30 group-focus:bg-gray-300/50 bottom-0 left-0 rounded-b-md"
            )}
            onClick={() => {
              setIsInMobileViewAndVisible(!isInMobileViewAndVisible);
            }}
          >
            <ChevronsDown
              className={cn(
                isInMobileViewAndVisible ? "rotate-180" : "",
                "transition-all duration-300 ease-in-out"
              )}
            />
          </motion.div>
        </div>
      </Suspense>
      <Suspense>
        {/* model conditionally rendered when needed only*/}
        {ifRendered && (
          <ModelComponent
            dataArray={dataArray}
            error={error}
            isError={isError}
            resumeId={resumeId}
            modelState={[showModel, setShowModel]}
            searchParams={searchParams}
            getAiRecomandations={getAiRecomandations}
            enriched={enriched}
            regeneratePdfImage={regeneratePdfImage}
            DownloadPDFFromServer={DownloadPDFFromServer}
          />
        )}
      </Suspense>
    </motion.div>
  );
}

export default PDFviewer;
