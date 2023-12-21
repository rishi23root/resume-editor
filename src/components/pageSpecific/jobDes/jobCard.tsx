"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RenderCompleted from "@/hooks/RenderCompleted";
import useRedirectHandler from "@/hooks/redirectionHandlers";
import { cn } from "@/lib/utils";
import { jobDescriptionDataType } from "@/types/jobDescription";
import { resumeTemplates } from "@/types/templates";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const Card = ({
  jobId,
  templateName,
  templateData,
}: {
  jobId: number;
  templateName: string;
  templateData: jobDescriptionDataType;
}) => {
  const [showModel, setShowModel] = useState(false);
  const ifRendered = RenderCompleted();
  const { urlWithAddedParams } = useRedirectHandler();

  // check if we have a param of redirectPage in the url
  const searchParams = useSearchParams();
  const redirectPage = searchParams.get("redirectPage");
  // if we have a redirectPage param then we will redirect to that page
  const templateBaseToRedirectUrl = (templateName: resumeTemplates) => {
    return redirectPage
      ? urlWithAddedParams(
          redirectPage,
          { jobId: jobId, templateName: templateName },
          { procegure: 4 }
        )
      : urlWithAddedParams(
          "/Payment",
          { jobId: jobId, templateName: templateName },
          { procegure: 3 }
        );
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-64 h-fit shadow-xl glass fcc overflow-hidden p-1 group hover:shadow-zinc-800 duration-50"
      >
        <div
          className="text-2xl text-center capitalize w-full h-full fc justify-between cursor-pointer pb-1 gap-2"
          onClick={() => {
            setShowModel(true);
          }}
        >
          {templateData.image && (
            <Image
              src={templateData.image[templateName]}
              alt={templateData.title}
              width={500}
              height={500}
              className="rounded-md shadow-xl h-auto w-auto"
            />
          )}
          <span className="group-hover:underline underline-offset-4 decoration-blue-500/40">
            {templateName}
          </span>
        </div>
      </motion.div>

      {/* model conditionally rendered when needed only*/}
      <Suspense>
        {ifRendered && showModel && (
          <Dialog
            open={showModel}
            onOpenChange={(_) => setShowModel(!showModel)}
          >
            <DialogContent className="max-w-[90vw] md:max-w-[70vw] h-[80vh] shadow-2xl shadow-gray-900  ">
              <DialogHeader>
                <DialogTitle className="bold text-xl">
                  <span className="text-white capitalize">{templateName}</span>
                  &nbsp; / &nbsp;
                  <span className="text-gray-600">{templateData.title}</span>
                </DialogTitle>
                <DialogDescription className="fr gap-8 p-4 h-full text-left">
                  <span className="flex-1 fc gap-4 h-full ">
                    <span className="flex-1 fc gap-4">
                      <span className="fc gap-2">
                        <span className="text-2xl bold capitalize text-white">
                          something like..
                        </span>
                        <span className="sm:text-sm md:text-md h-52 overflow-y-scroll">
                          {templateData.jobDes}
                        </span>
                      </span>
                      <span className="fc gap-2">
                        <span className="text-2xl bold capitalize text-white">
                          Sections in use
                        </span>
                        <span className="text-white fc">
                          {Object.values(templateData.mask)
                            .filter((item) => item !== "basics")
                            .map((item) => (
                              <span key={item} className="text-lg">
                                {/* => {item} */}
                                =&gt; {item}
                              </span>
                            ))}
                        </span>
                      </span>
                    </span>
                    <Button
                      className={cn(
                        "p-6 my-2 lg:text-2xl text-xl capitalize bg-blue-500 rounded-md m-auto text-white text-center w-full ",
                        "transition ease-in-out delay-150", //animate
                        "hove:bg-blue-600 hover:shadow-lg hover:rounded-lg hover:shadow-zinc-500 hover:text-black"
                      )}
                    >
                      <Link
                        href={templateBaseToRedirectUrl(
                          templateName as resumeTemplates
                        )}
                        className="w-full"
                      >
                        Continue with &nbsp;
                        <span className="bold italic">{templateName}</span>
                      </Link>
                    </Button>
                  </span>
                  <span className="w-[40%] hidden lg:flex fcc">
                    <span className="flex align-middle">
                      {templateData.image && (
                        <Image
                          src={templateData.image[templateName]}
                          alt={templateData.title}
                          width={500}
                          height={500}
                          className="rounded-md shadow-xl h-auto w-auto"
                        />
                      )}
                    </span>
                  </span>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </Suspense>
    </>
  );
};

export default Card;
