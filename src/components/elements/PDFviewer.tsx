// working under issue #35

// this component have single task to show pdf file in the browser
// using react-pdf library
// take pdf file as props and show it in the browser or take id to request pdf file from server

"use client";

import { ZoomerImage } from "@/components/custom/ImageMagnify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RenderCompleted from "@/hooks/RenderCompleted";
import { cn } from "@/lib/utils";
import { trpc } from "@/serverTRPC/client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  ArrowDownFromLine,
  Download,
  FileJson2,
  FileText,
  HardDriveDownload,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { Loadingstate } from "../Fallbacks";
import { useToast } from "../ui/use-toast";

import { useRouter } from "next/navigation";
import { ActionBtn } from "../pageSpecific/builder/uitls";

function PDFviewer({
  templateName,
  resumeId,
  enriched,
  state,
  userId,
}: {
  enriched: boolean;
  state: string;
  templateName: string;
  resumeId: string;
  userId: string;
}) {
  const [showModel, setShowModel] = useState(false);
  const [dataArray, setDataArray] = useState<string[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>();
  const ifRendered = RenderCompleted();

  const { toast } = useToast();
  const router = useRouter();

  // generating pdf
  const { data, isLoading, isError, error } = trpc.builder.generatePDF.useQuery(
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
    // downloadPDF();
  }
  function DownloadSchemaFromServer() {
    // downloadSchema();
  }
  async function delResumeAndRedirect() {
    // delete the resume from the server
    // show notification of deleting
    // onsuccess redirect to the dashboard
    if (confirm("Deleting resume: " + resumeId)) {
      deleteResume.mutate({ id: resumeId });
    }
  }

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
      <motion.div
        layout
        className="flex-1 justify-center fr gap-2 overflow-hidden"
      >
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
          className="rounded-md transition-[width] duration-500 ease-in-out opacity-0  w-0 group-hover:opacity-100 group-hover:w-[10%]  p-2 flex flex-col justify-top gap-4"
        >
          <div className="w-full text-center mb-4 opacity-0 group-hover:opacity-70 duration-150 delay-300 capitalize text-lg ">
            Actions
          </div>
          <ActionBtn toolkitContent="download resume">
            <ArrowDownFromLine className="scale-125" />
          </ActionBtn>
          <ActionBtn
            toolkitContent="refresh editor"
            onPress={() => {
              // relaod the page
              location.reload();
            }}
          >
            <RefreshCcw className="scale-125" />
          </ActionBtn>
          <ActionBtn toolkitContent="download schema">
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
          showModel={showModel}
          setShowModel={setShowModel}
        />
      )}
    </motion.div>
  );
}

function ModelComponent({
  resumeId,
  isError,
  error,
  dataArray,
  showModel,
  setShowModel,
}: {
  resumeId: string;
  isError: boolean;
  error: any;
  dataArray: string[];
  showModel: boolean;
  setShowModel: Dispatch<SetStateAction<boolean>>;
}) {
  // model code
  const ref = useRef<HTMLDivElement>(null);
  const pdfOverLayDivRef = useRef<HTMLDivElement>(null);

  const shadowColor = "rgba(0, 0, 0, 0.5)";
  const { scrollXProgress } = useScroll({ container: ref });

  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    // console.log("pdf scroll latest: ", latest);

    if (dataArray.length > 1) {
      if (latest == 0) {
        console.log("top");
        pdfOverLayDivRef.current?.style.setProperty(
          "--topBlurColor",
          "transparent"
        );
        pdfOverLayDivRef.current?.style.setProperty(
          "--bottomBlurColor",
          shadowColor
        );
      } else if (latest > 0.99) {
        console.log("bottom");
        pdfOverLayDivRef.current?.style.setProperty(
          "--bottomBlurColor",
          "transparent"
        );
        pdfOverLayDivRef.current?.style.setProperty(
          "--topBlurColor",
          shadowColor
        );
      } else {
        pdfOverLayDivRef.current?.style.setProperty(
          "--bottomBlurColor",
          shadowColor
        );
        pdfOverLayDivRef.current?.style.setProperty(
          "--topBlurColor",
          shadowColor
        );
      }
    }
  });

  return (
    <Suspense>
      {showModel && (
        <Dialog open={showModel} onOpenChange={(_) => setShowModel(!showModel)}>
          <DialogContent className="max-w-[90vw] md:max-w-[70vw] h-[80vh] shadow-2xl shadow-gray-900 overflow-hidden  ">
            <DialogHeader>
              <DialogTitle className="bold text-xl">
                <span className="text-white capitalize">Resume</span>
                &nbsp; / &nbsp;
                <span className="text-gray-600">{resumeId}</span>
              </DialogTitle>
              <DialogDescription className="fr gap-8 p-4 h-full text-left">
                <span className="flex-1 fc gap-4 h-full ">
                  <span className="flex-1 fc gap-4 border">
                    {/* ats score */}
                    {/* ai generated inprovements */}
                    <span className="fc gap-2">testing</span>
                    <span className="fc gap-2">testing content</span>
                  </span>
                  <Button
                    className={cn(
                      "p-6 my-2 lg:text-2xl text-xl capitalize bg-blue-500 rounded-md m-auto text-white text-center w-full ",
                      "transition ease-in-out delay-150", //animate
                      "hove:bg-blue-600 hover:shadow-lg hover:rounded-lg hover:shadow-zinc-500 hover:text-black"
                    )}
                    onClick={() => {
                      alert("pdf download function executed");
                    }}
                  >
                    Download PDF
                    <HardDriveDownload />
                  </Button>
                </span>
                <span className="w-[50%] hidden lg:fc fcc">
                  <span className="w-full text-center text-lg capitalize">
                    Resume
                  </span>
                  <div
                    ref={pdfOverLayDivRef}
                    className="pdfShowOverlay flex h-full max-w-full mx-2 items-center justify-center relative "
                  >
                    {isError && (
                      <div className="w-full fc fcc">{error.toString()}</div>
                    )}
                    <motion.div
                      ref={ref}
                      className=" h-auto overflow-x-scroll flex flex-row gap-4 w-[full]"
                    >
                      {dataArray &&
                        dataArray.length > 0 &&
                        dataArray.map((el, index) => (
                          <ZoomerImage
                            src={el}
                            key={index}
                            alt={"autogenrated resume image"}
                            width={400}
                            height={600}
                            zoomType="click"
                            className="rounded-md shadow-xl object-cover w-[33em] min-w-[30em] border border-green-200 "
                          />
                        ))}
                    </motion.div>
                  </div>
                </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </Suspense>
  );
}

export default PDFviewer;
