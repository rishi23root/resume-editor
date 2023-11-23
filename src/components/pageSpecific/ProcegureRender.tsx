"use client";

import { cn } from "@/lib/utils";
import { privateData } from "@/types/utils";
import { decodeBase64ToJSON } from "@/utils/paramHandeler";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";

function ProcegureRender() {
  const privateSessionData = useSearchParams().get("_s");
  let data = decodeBase64ToJSON(privateSessionData as string) as privateData;
  // {data?.procegure}

  if (privateSessionData !== null && data.procegure !== undefined) {
    return (
      <div className={cn("fc fcc md:glass min-h-12", "md:p-2")}>
        <motion.div layout className="w-full md:w-[70%] fr fcb gap-4">
          <ProcegureElement
            count={1}
            discription={"Chose your Job type"}
            currentProcegure={data.procegure}
          />
          <ProcegureElement
            count={2}
            discription={"Select a Template"}
            currentProcegure={data.procegure}
          />
          <ProcegureElement
            count={3}
            discription={"Completer payment"}
            currentProcegure={data.procegure}
          />
          <ProcegureElement
            count={4}
            discription={"Build your Resume ;)"}
            currentProcegure={data.procegure}
          />
        </motion.div>
      </div>
    );
  }
  return null;
}

const ProcegureElement = ({
  count,
  discription,
  currentProcegure,
}: {
  count: number;
  discription: string;
  currentProcegure: number;
}) => {
  return (
    <Fragment key="loading_animator">
      <motion.div className="fcc fr gap-3">
        <motion.div
          className={cn(
            "rounded-[1.3rem] p-2 w-12 h-12 fcc glass shadow-md hover:shadow-zinc-700 text-xl",
            count === currentProcegure
              ? "bg-[#6255C2] shadow-zinc-700 hover:shadow-xl"
              : ""
          )}
        >
          {count}
        </motion.div>
        <AnimatePresence mode="wait" initial={false}>
          {count === currentProcegure ? (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.2,
                  delay: 0.5,
                },
              }}
              exit={{
                opacity: 0,
                width: 0,
                transition: {
                  duration: 0.1,
                  delay: 0.1,
                },
              }}
              className="whitespace-nowrap -z-2 text-md md:text-xl font-semibold p-2"
            >
              {discription}
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </motion.div>
    </Fragment>
  );
};

export default ProcegureRender;
