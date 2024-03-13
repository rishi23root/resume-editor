"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export const customImage = (props: any) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
    >
      <Image
        {...props}
        className="w-full rounded-xl shadow-lg animate-fadeEntry"
        width={800}
        height={800}
      />
    </motion.span>
  );
};
