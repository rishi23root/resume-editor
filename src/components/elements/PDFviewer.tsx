// working under issue #35

// this component have single task to show pdf file in the browser
// using react-pdf library
// take pdf file as props and show it in the browser or take id to request pdf file from server

"use client";

import { ZoomerImage } from "@/components/custom/ImageMagnify";
import RenderCompleted from "@/hooks/RenderCompleted";
import { trpc } from "@/serverTRPC/client";
import { motion } from "framer-motion";
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

import { useRouter } from "next/navigation";
import { ActionBtn, ModelComponent } from "../pageSpecific/builder/uitls";
import { saveAs } from "file-saver";
import { format } from "date-fns";

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
          <ActionBtn
            toolkitContent="download resume"
            onPress={DownloadPDFFromServer}
          >
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
          showModel={showModel}
          setShowModel={setShowModel}
        />
      )}
    </motion.div>
  );
}

export default PDFviewer;
