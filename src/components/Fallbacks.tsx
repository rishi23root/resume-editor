"use client";
import { cn } from "@/lib/utils";
import { type ClassValue } from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Loadingstate({
  className,
  text,
}: {
  className?: ClassValue;
  text?: string;
}) {
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
      style={{
        width: (text ? text.length : 25) + "ch",
      }}
      className={cn("text-center text-white fcc", className)}
    >
      {/* Loading please wait */}
      {Dots} {text ? text : "Loading please wait"} {Dots}
    </motion.div>
  );
}
