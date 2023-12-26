"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

// take the child element of image and wrap it in a div with overflow hidden
// take the parent element and add a mouseover event
// only on while hovering over the parent element, show the zoomed child element
// on mouseout, hide the zoomed child element
// calculate the percentage position of the cursor on the parent element x and y

export const ZoomerImage = (ImageProps: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}) => {
  return (
    <motion.span className="cursor-pointer rounded-md shadow-xl w-full h-full fcc relative overflow-hidden group ">
      <Image
        {...ImageProps}
        className={cn(
          ImageProps.className,
          "transition-all duration-300 ease-in-out absolute group-hover:scale-125"
        )}
      />
    </motion.span>
  );
};
