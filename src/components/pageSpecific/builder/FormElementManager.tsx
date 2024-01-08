"use client";
// "yes, it is inportant to have this file !"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";
import {
  Awards,
  Basic,
  Education,
  Projects,
  Skills,
  Work,
} from "./customFormFields/sections/FormSections";

export default function FormManager({ onSubmit }: { onSubmit: any }) {
  const ref = useRef<HTMLFormElement>(null);
  const formOverLayDivRef = useRef<HTMLDivElement>(null);

  const shadowColor = "rgba(0, 0, 0, 0.3)";

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log("scroll latest: ", latest);

    if (latest == 0) {
      // console.log("top");
      formOverLayDivRef.current?.style.setProperty(
        "--topBlurColor",
        "transparent"
      );
      formOverLayDivRef.current?.style.setProperty(
        "--bottomBlurColor",
        shadowColor
      );
    } else if (latest > 0.99) {
      // console.log("bottom");
      formOverLayDivRef.current?.style.setProperty(
        "--bottomBlurColor",
        "transparent"
      );
      formOverLayDivRef.current?.style.setProperty(
        "--topBlurColor",
        shadowColor
      );
    } else {
      formOverLayDivRef.current?.style.setProperty(
        "--bottomBlurColor",
        shadowColor
      );
      formOverLayDivRef.current?.style.setProperty(
        "--topBlurColor",
        shadowColor
      );
    }
  });

  return (
    <div
      className={cn(
        "items-center w-full md:w-[60%] fc md:h-full gap-4 relative rounded-md",
        "formOverLay"
      )}
      ref={formOverLayDivRef}
    >
      <motion.form
        ref={ref}
        onSubmit={onSubmit}
        className="w-full h-full fc gap-2 overflow-y-scroll pr-1"
        noValidate
      >
        <Basic />
        <Skills />
        <Work />
        <Education />
        <Projects />
        <Awards />

        <Button
          className={cn(
            "w-full bg-gradient-to-r from-blue-600 to-fuchsia-500",
            "transition ease-in-out delay-150", //animate
            "hover:shadow-md hover:shadow-zinc-500",
            "fc fcc justify-center items-center"
          )}
        >
          <input
            type="submit"
            className={cn(
              "cursor-pointer text-primary text-xl font-bold",
              "w-full h-full",
              "flex-1 p-auto"
            )}
          />
        </Button>
      </motion.form>
    </div>
  );
}
