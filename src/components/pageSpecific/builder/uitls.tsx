"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ActionBtn({
  children,
  onPress,
  toolkitContent,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  toolkitContent?: string;
}) {
  return (
    <div
      onClick={onPress}
      className="w-full flex  justify-center opacity-0 group-hover:opacity-100 duration-150 delay-500"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <motion.div
              layout
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              // whileTap={{
              //   scale: 0.9,
              // }}
              className={cn(
                "p-6 shadow-sm rounded-md shadow-gray-500/50",
                "bg-white/20  ",
                "duration-500 delay-100 ease-in shadow-lg hover:shadow-zinc-500 transition-all",
                "hover:bg-gradient-to-b from-blue-600 to-fuchsia-500 text-white",
                "cursor-pointer"
              )}
            >
              {children}
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="opacity-80 pointer-events-none rounded-md">
            <p>{toolkitContent}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
