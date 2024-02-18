"use client";

import { cn } from "@/lib/utils";
import { uploadFile } from "@/utils/upload";
import { motion } from "framer-motion";
import { FileJson, FileText } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Loadingstate } from "../Fallbacks";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";
import useRedirectHandler from "@/hooks/redirectionHandlers";

const UploadResume = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { urlWithAddedParams } = useRedirectHandler();

  const [file, setFiles] = useState<File[] | null>();
  const onDrop = useCallback((file: any) => setFiles(file), [setFiles]);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    inputRef,
    isFocused,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/json": [".json"],
    },
    onDrop,
    maxFiles: 1,
  });

  const files = acceptedFiles.map((file) => {
    // check if file is pdf or json
    // if pdf then show pdf icon and name under it
    // if json then show json icon and name under it

    return (
      <div key={file.name} className=" fc fcc text-md w-full h-full">
        {/* Define */}
        <div className="text-2xl font-extrabold ">
          {file.name.endsWith(".pdf") ? "PDF resume" : "Schema File"}
        </div>
        {/* logo */}
        {file.name.endsWith(".pdf") ? (
          <FileText size={64} className="m-4" />
        ) : (
          <FileJson size={64} className="m-4" />
        )}
        {file.name}
      </div>
    );
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <div key={file.name} className="text-red-300">
        <span className="bold">Rejected =&gt; </span>
        {file.name}
      </div>
    );
  });

  const removeAll = () => {
    // console.log("Removing All file");
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    setFiles(null);
  };

  useEffect(() => {
    // console.log(file);
    const fileNotifier = setTimeout(() => {
      if (file) {
        toast({
          variant: "default",
          title: "File is being processed",
          description: "Please wait for a moment",
        });
      }
    }, 1000);
    if (file) {
      // console.log("file do exist", file);
      // make formData and append file to it // fix for direct file is not being passing into server function argument
      const formData = new FormData();
      formData.append("file", file[0]);

      uploadFile(formData).then((res) => {
        clearTimeout(fileNotifier);
        if (res.hasOwnProperty("error")) {
          // console.log(res);
          toast({
            variant: "destructive",
            title: res.error?.title,
            description: res.error?.des,
          });
          removeAll();
        }
        // redirect data id
        else if (res.hasOwnProperty("data")) {
          toast({
            variant: "default",
            title: "File uploaded successfully",
            description: "Redirecting to the next page :)",
          });
          const jsonDataId = res?.data?.jsonDataId;
          // redirect the user to next page
          const redirectUrl = urlWithAddedParams(
            "/Builder",
            {},
            { jsonDataId }
          );
          router.push(redirectUrl);
        } else {
          toast({
            variant: "destructive",
            title: "File upload Error 505",
            description: "something went wrong please try again :(",
            action: (
              <ToastAction
                altText="click to refresh page "
                onClick={() => {
                  router.refresh();
                }}
              >
                click to refresh page {"->"}
              </ToastAction>
            ),
          });
          removeAll();
        }
      });
    }

    return () => {
      clearTimeout(fileNotifier);
    };
  }, [file]);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "min-w-[24.5rem] h-64 overflow-hidden duration-75 shadow-2xl cursor-pointer rounded-xl noisebg glass border-dashed border-4 text-center",
        isFocused ? "border-blue-500" : "",
        files.length ? "border-fuchsia-200/50" : "",
        fileRejectionItems.length ? "border-red-500" : "",
        isDragActive ? "border-gray-500" : ""
      )}
    >
      <div
        {...getRootProps()}
        className="w-full h-full gap-2 text-center fcc fc"
      >
        <input {...getInputProps()} />
        {!files.length && (
          <>
            <div className="text-3xl">
              <Image
                src={"/svgs/upload.png"}
                height={60}
                width={60}
                alt="upload icon"
                className="invert w-16 h-16"
              />
            </div>
            <div className="text-xl font-bold">
              or Upload your Pdf/Schema to parse
            </div>
            <div className="text-xs text-center text-white text-opacity-70">
              Our Ai will take the lead from here, you will be
              <br />
              able to update data in later phases
            </div>
            {!fileRejectionItems.length && isFocused && (
              <>Drag and drop your pdf Resume here</>
            )}
            {!fileRejectionItems.length && isDragReject && (
              <>click to drop your File here</>
            )}
          </>
        )}

        {files.length > 0 && files}
        {files.length > 0 && (
          <Loadingstate
            text="Processing your file"
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-fuchsia-500 bold"
          />
        )}
        {fileRejectionItems.length > 0 && fileRejectionItems}
        {fileRejectionItems.length !== 0 && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-fuchsia-500">
            Try again with correct files
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default UploadResume;
