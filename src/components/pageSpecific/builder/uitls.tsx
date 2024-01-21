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
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { HardDriveDownload } from "lucide-react";
import { Dispatch, SetStateAction, Suspense, useRef } from "react";

export function ActionBtn({
  children,
  onPress,
  toolkitContent,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  toolkitContent?: string;
}) {
  return (
    <div
      onClick={onPress}
      className="w-full flex flex-col gap-2  justify-center opacity-0 group-hover:opacity-100 duration-150 delay-500 group/actionBtn"
    >
      <motion.div
        layout
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className={cn(
          "p-6 shadow-sm rounded-md shadow-gray-500/50",
          "bg-white/20 m-auto w-fit ",
          "duration-500 delay-100 ease-in shadow-lg hover:shadow-zinc-500 transition-all",
          "hover:bg-gradient-to-b from-blue-600 to-fuchsia-500 text-white",
          "cursor-pointer "
        )}
      >
        {children}
      </motion.div>
      <motion.div
        layout
        className={cn(
          "opacity-0 -translate-y-4",
          "group-hover/actionBtn:mb-2 group-hover/actionBtn:opacity-100 group-hover/actionBtn:translate-y-0",
          "transition-all duration-150 ease-in-out h-2 leading-0 capitalize text-center text-sm text-white/60"
        )}
      >
        {toolkitContent}
      </motion.div>
    </div>
  );
}

export function ModelComponent({
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
