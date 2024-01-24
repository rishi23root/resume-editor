"use client";

import RenderCompleted from "@/hooks/RenderCompleted";
import { cn } from "@/lib/utils";
import { privateData } from "@/types/utils";
import { decodeBase64ToJSON } from "@/utils/paramHandeler";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

function ProcegureRender() {
  const privateSessionData = useSearchParams().get("_s");
  let data = decodeBase64ToJSON(privateSessionData as string) as privateData;
  const isRendered = RenderCompleted();

  const [keepProcegureRender, setkeepProcegureRender] = useState(true);
  const [keepProcegureRenderChildren, setkeepProcegureRenderChildren] =
    useState(true);

  useEffect(() => {
    var timeout: NodeJS.Timeout;
    var timeoutForChildren: NodeJS.Timeout;
    if (data.procegure === 4) {
      timeout = setTimeout(() => {
        setkeepProcegureRender(false);
      }, 2000);
      timeoutForChildren = setTimeout(() => {
        setkeepProcegureRenderChildren(false);
      }, 1000);
    }

    if (data.procegure !== 4) {
      setkeepProcegureRender(true);
      setkeepProcegureRenderChildren(true);
    }
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeoutForChildren);
    };
  }, [data, privateSessionData]);

  // for hydaration sake
  if (!isRendered) {
    return null;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {
          // privateSessionData !== null &&
          data.procegure !== undefined && keepProcegureRender ? (
            <motion.div
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.2 },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: 0.5, delay: 2 },
              }}
              className="fc fcc md:glass min-h-12 md:p-2"
            >
              <motion.div
                layout
                className={cn(
                  "w-full md:w-[70%] fr fcb gap-4 transition-all duration-200 ease-in-out",
                  data.procegure === 4 && "justify-center" // if the procegure is 4 then center the procegure render
                )}
              >
                <ProcegureElement
                  count={1}
                  discription={"Chose your Job type"}
                  currentProcegure={data.procegure}
                  keepProcegureRenderChildren={keepProcegureRenderChildren}
                />
                <ProcegureElement
                  count={2}
                  discription={"Select a Template"}
                  currentProcegure={data.procegure}
                  keepProcegureRenderChildren={keepProcegureRenderChildren}
                />
                <ProcegureElement
                  count={3}
                  discription={"Choose payment"}
                  currentProcegure={data.procegure}
                  keepProcegureRenderChildren={keepProcegureRenderChildren}
                />
                <ProcegureElement
                  count={4}
                  discription={"Build your Resume ;)"}
                  currentProcegure={data.procegure}
                  keepProcegureRenderChildren={keepProcegureRenderChildren}
                />
              </motion.div>
            </motion.div>
          ) : null
        }
      </AnimatePresence>
    </>
  );
}

const ProcegureElement = ({
  count,
  discription,
  currentProcegure,
  keepProcegureRenderChildren,
}: {
  count: number;
  discription: string;
  currentProcegure: number;
  keepProcegureRenderChildren: boolean;
}) => {
  const [toRemore, setToRemove] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log(count, currentProcegure);

    var timeout: NodeJS.Timeout;
    if (currentProcegure === 4) {
      timeout = setTimeout(() => {
        setToRemove(true);
      }, 1500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [count, currentProcegure]);

  return (
    <Fragment key={count}>
      {(currentProcegure !== 4 || count === 4) && (
        <motion.div
          className="fcc fr gap-3 transition-all duration-200 ease-in-out"
          key={count}
        >
          <AnimatePresence mode="wait">
            {!toRemore && keepProcegureRenderChildren && (
              <motion.div
                key={"number element" + count}
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.2,
                    delay: 0.2,
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: [1.05, 1, 0],
                  x: -5,
                  transition: {
                    duration: 0.2,
                  },
                }}
                className={cn(
                  "rounded-[1.3rem] p-2 w-12 h-12 fcc glass shadow-md hover:shadow-zinc-700 text-xl cursor-pointer",
                  count === currentProcegure
                    ? "bg-[#6255C2] shadow-zinc-700 hover:shadow-xl"
                    : count < currentProcegure
                    ? " hover:shadow-zinc-500/50 shadown-xl"
                    : "cursor-default"
                )}
                onClick={() => {
                  if (count < currentProcegure) {
                    console.log(count);
                    router.back();
                  }
                }}
                whileTap={{ scale: 1.05 }}
              >
                {count}
              </motion.div>
            )}
          </AnimatePresence>
          {/* idk why, but need to use sperate animation presence for each elelment else giving key warning :< */}
          <AnimatePresence mode="wait">
            {count === currentProcegure && !toRemore && (
              <motion.div
                key={"discription element" + count}
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
                  ...(count === 4 ? {} : { width: 0 }),
                  transition: {
                    duration: 0.3,
                    delay: count === 4 ? 2 : 0.1,
                  },
                }}
                className={cn(
                  "whitespace-nowrap -z-2 text-md md:text-xl font-semibold p-2 h-12",
                  currentProcegure === 4 && "md:text-2xl"
                )}
              >
                {discription}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </Fragment>
  );
};

export default ProcegureRender;
