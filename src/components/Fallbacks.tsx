"use client";
import { cn } from "@/lib/utils";
import { type ClassValue } from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Loadingstate({ className }: { className?: ClassValue }) {
  const [Dots, setDots] = useState<string>("");
  useEffect(() => {
    const tout = setInterval(() => {
      // loop through dots and circulate 0 1 2 3 dots
      if (Dots.length < 4) {
        setDots(Dots + ".");
      } else {
        setDots("");
      }
    }, 500);
    return () => {
      clearInterval(tout);
    };
  });
  return (
    <motion.div
      initial={{
        opacity: 0.6,
      }}
      animate={{
        opacity: 1,
      }}
      className={cn("text-center text-white border w-full fcc ", className)}
    >
      Loading please wait {Dots}
    </motion.div>
  );
}
