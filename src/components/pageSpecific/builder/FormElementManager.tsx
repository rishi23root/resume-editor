"use client";
// "yes, it is inportant to have this file !"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Inputs } from "@/types/builder";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Basic, Work } from "./customFormFields/sections/FormSection";

export default function FormManager({
  register,
  handleSubmit,
  watch,
  control,
  formState: { errors },
  onSubmit,
}: UseFormReturn<Inputs, any, undefined> & {
  onSubmit: SubmitHandler<Inputs>;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const formOverLayDivRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (scrollYProgress.get() == 0) {
      // console.log("top");
      formOverLayDivRef.current?.style.setProperty(
        "--topBlurColor",
        "transparent"
      );
      formOverLayDivRef.current?.style.setProperty(
        "--bottomBlurColor",
        "rgb(255, 255, 255)"
      );
    } else if (scrollYProgress.get() == 1) {
      // console.log("bottom");
      formOverLayDivRef.current?.style.setProperty(
        "--bottomBlurColor",
        "transparent"
      );
      formOverLayDivRef.current?.style.setProperty(
        "--topBlurColor",
        "rgb(255, 255, 255)"
      );
    } else {
      formOverLayDivRef.current?.style.setProperty(
        "--bottomBlurColor",
        "rgb(255, 255, 255)"
      );
      formOverLayDivRef.current?.style.setProperty(
        "--topBlurColor",
        "rgb(255, 255, 255)"
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
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full fc gap-2 overflow-y-scroll pr-1"
      >
        <Basic register={register} control={control} error={errors} />
        <Work register={register} control={control} error={errors} />
        <Button
          className={cn(
            "w-full bg-gradient-to-r from-blue-600 to-fuchsia-500",
            "transition ease-in-out delay-150", //animate
            "hover:shadow-md hover:shadow-zinc-500"
          )}
        >
          <input type="submit" className="text-primary text-xl font-bold" />
        </Button>
      </motion.form>
    </div>
  );
}
