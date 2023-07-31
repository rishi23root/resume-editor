"use client";
import TwScreenInfo from "@/components/custom/TwScreenInfo";
import AnimateText from "@/components/custom/AmimateText";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  return (
    // make whole page with 10/12 width and center it on above medium screens
    <main className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] flex  lg:gap-20 gap-8 min-h-screen min-w-ful items-center  ">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimateText text="Comming Soon" className="text-[5vw]" />
          <AnimateText
            text="Please wait for it"
            className="text-[2.3em] text-zinc-400"
          />
        </motion.div>
      </AnimatePresence>

      {/* <TwScreenInfo /> */}
    </main>
  );
}
