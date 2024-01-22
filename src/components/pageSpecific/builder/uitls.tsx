"use client";

import { Loadingstate } from "@/components/Fallbacks";
import { ZoomerImage } from "@/components/custom/ImageMagnify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useRedirectHandler from "@/hooks/redirectionHandlers";
import { cn } from "@/lib/utils";
import { trpc } from "@/serverTRPC/client";
import { Inputs } from "@/types/builder";
import { searchParamType } from "@/types/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { HardDriveDownload } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

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
      className="w-full flex flex-col gap-2  justify-center opacity-0 group-hover:opacity-100 duration-150 delay-500 group/actionBtn "
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
          "bg-white/20 mr-auto w-fit ",
          "duration-500 delay-100 ease-in shadow-lg hover:shadow-zinc-500 transition-all",
          "hover:bg-blue-500/50 text-white",
          "cursor-pointer relative"
        )}
      >
        {children}
        <motion.div
          layout
          className={cn(
            "absolute  left-[105%] top-0 h-full text-center ",
            "flex justify-center items-center opacity-0",
            "group-hover/actionBtn:opacity-100 ",
            "transition-all duration-150 ease-in-out leading-0 capitalize text-center text-sm  text-wrap "
          )}
        >
          <motion.div
            layout
            className={cn(
              "w-[5ch] pl-1 text-left text-white/60",
              "transform -translate-x-8 group-hover/actionBtn:translate-x-0",
              "transition-transform duration-250 ease-in-out "
            )}
          >
            {toolkitContent}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ModelComponent({
  resumeId,
  isError,
  error,
  dataArray,
  modelState,
  searchParams,
  resumeData,
  getAiRecomandations,
  enriched,
  regeneratePdfImage,
}: {
  resumeId: string;
  isError: boolean;
  error: any;
  dataArray: string[];
  modelState: [boolean, Dispatch<SetStateAction<boolean>>];
  searchParams: searchParamType;
  resumeData: Inputs | undefined;
  getAiRecomandations: any;
  enriched: boolean;
  regeneratePdfImage: any;
}) {
  const router = useRouter();
  const { urlWithAddedParams } = useRedirectHandler();
  const [refetching, setRefetching] = useState<
    "refetching" | "error fetching, close and try again" | "idle"
  >("idle");

  // model state
  const [showModel, setShowModel] = modelState;

  const {
    data: atsAndRecommendation,
    isLoading: isRecommendationLoading,
    mutate: refetch,
  } = getAiRecomandations;

  useEffect(() => {
    if (showModel && enriched) {
      setRefetching("refetching");
      refetch(
        {
          resumeId,
        },
        {
          onError: (error: any) => {
            console.log(error);
            setRefetching("error fetching, close and try again");
          },
          onSuccess: (data: any) => {
            console.log(data);
            setRefetching("idle");
          },
        }
      );
    }
  }, [showModel]);

  // model showcase code
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

  const { data: templates, isLoading: isTemplateLoading } =
    trpc.templates.all.useQuery(undefined, {
      // fetch only once and cache it
      staleTime: Infinity,
    });

  function changeTemplate(newTemplateName: string) {
    // update the current current url with this new template name
    // router.push();
    let newTemplateUrl = urlWithAddedParams("/Builder", {
      templateName: newTemplateName,
    });
    router.push(newTemplateUrl);
    // console.log(newTemplateUrl);
    regeneratePdfImage({
      resumeId,
      templateName: newTemplateName,
    });
  }

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
                  {/* active template and option to change it */}
                  <span className="fc gap-2">
                    <span className="text-2xl bold capitalize text-white">
                      Template :{" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <span className="opacity-60 underline underline-offset-4 cursor-pointer">
                            {searchParams.templateName}
                          </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Change Template</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={searchParams.templateName as string}
                            onValueChange={changeTemplate}
                          >
                            {/* map all templates  */}
                            {isTemplateLoading ? "Loading.." : ""}
                            {!isTemplateLoading &&
                              templates &&
                              templates.map((val, index) => (
                                <DropdownMenuRadioItem
                                  value={val}
                                  key={index}
                                  className="capitalize"
                                >
                                  {val}
                                </DropdownMenuRadioItem>
                              ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  </span>

                  {/* ats score */}
                  <span className="fc gap-2">
                    <span className="text-2xl bold capitalize text-white">
                      Ats Score:{" "}
                      <span className="opacity-60 cursor-pointer">8</span>
                    </span>
                  </span>

                  {/* active sections from jobid  */}
                  <span className="fc gap-2">
                    <span className="text-2xl bold capitalize text-white">
                      Sections in use
                    </span>
                    <span className=" fc ">
                      {!resumeData && <Loadingstate />}
                      {resumeData &&
                        Object.values(resumeData.mask)
                          .filter((item) => item !== "basics")
                          .map((item) => (
                            <span key={item} className="text-lg text-white/50">
                              {/* => {item} */}
                              =&gt; {item}
                            </span>
                          ))}
                    </span>
                  </span>

                  {/* ai generated inprovements */}
                  <span className="fc gap-2 ">
                    <span className="text-2xl bold capitalize text-white">
                      Possible Updates ◔̯ ◔
                    </span>
                    <span className="fc gap-2">
                      {refetching !== "idle"
                        ? refetching
                        : atsAndRecommendation.recommandations}
                    </span>
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
