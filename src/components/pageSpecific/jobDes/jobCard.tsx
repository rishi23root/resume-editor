"use client";

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
import { templateArrayTypes } from "@/types/jobDescription";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense, useState } from "react";

const Card = ({
  jobId,
  templateData,
}: {
  jobId: number;
  templateData: templateArrayTypes;
}) => {
  const [showModel, setShowModel] = useState(false);
  const ifRendered = RenderCompleted();
  const { urlWithAddedParams } = useRedirectHandler();

  return (
    <>
      <motion.div className="relative h-56 shadow-xl w-44 glass fcc group overflow-hidden p-1 ">
        <div
          onClick={() => {
            setShowModel(true);
          }}
          className="text-xl text-center w-full h-full fcc fc cursor-pointer"
        >
          {templateData.title}
        </div>

        <Link
          className="absolute hidden group-hover:flex bottom-1 w-full fcc"
          href={urlWithAddedParams(
            { jobId: jobId },
            { procegure: 2 },
            "/Templates"
          )}
        >
          <motion.div
            className={cn(
              "border border-zinc-500 bg-zinc-200 text-center w-full text-black py-2 mx-1",
              "shadow-xl rounded-sm opacity-80 text-md ",
              "hover:shadow-2xl hover:rounded-md hover:opacity-100 hover:-translate-y-1",
              "transition-all ease-in-out "
            )}
          >
            Use Job Title
          </motion.div>
        </Link>
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
                <DialogTitle>{templateData.title}</DialogTitle>
                <DialogDescription>
                  {templateData.description}
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
