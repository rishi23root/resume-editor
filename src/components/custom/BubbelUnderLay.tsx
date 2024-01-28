"use client";
import RenderCompleted from "@/hooks/RenderCompleted";
import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import React, { memo, useMemo } from "react";
import { useEffect } from "react";

function BubbleUnderlay({
  className,
}: {
  className?: string;
}): React.ReactElement {
  //   cover for the whole screen
  const numBubbles = useMemo(
    () => Math.floor(Math.random() * 10) + Math.floor(window.innerHeight / 100),
    []
  );

  const isRenderd = RenderCompleted();

  // Default values
  const bubbleColors = [
    "bg-sky-400",
    "bg-purple-600",
    "bg-amber-300",
    "bg-orange-400",
  ];
  const bubbleSizes = [64, 96, 72, 80];

  if (!isRenderd) return <></>;
  return (
    <div className={className}>
      <AnimatePresence initial={true}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 2,
            delay: 0.5,
          }}
          className="relative w-full h-full"
        >
          {Array(numBubbles)
            .fill(0)
            .map((_, index) => {
              // Choose a random color and size for each bubble
              const color =
                bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
              const size =
                bubbleSizes[Math.floor(Math.random() * bubbleColors.length)];
              return (
                <Bubble key={index} index={index} color={color} size={size} />
              );
            })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default memo(BubbleUnderlay);

const Bubble = memo(
  ({ index, color, size }: { index: number; color: string; size: number }) => {
    let newValInterval = 20000; // 20s
    const positionX = useMotionValue(
      (Math.random() * 1.5 - 0.5) * window.innerWidth
    );
    const positionY = useMotionValue(
      (Math.random() * 1.5 - 0.5) * window.innerHeight
    );

    const updatePosition = () => {
      positionX.set((Math.random() * 1.5 - 0.5) * window.innerWidth);
      positionY.set((Math.random() * 1.5 - 0.5) * window.innerHeight);
      // console.log(positionX.get(), positionY.get());
    };

    // this runs only one time
    useEffect(() => {
      updatePosition(); // Set initial position
      const intervalIns = setInterval(updatePosition, newValInterval);
      return () => {
        clearInterval(intervalIns);
      };
    });

    // for mouse event
    // const handleMouseMove = (e: MouseEvent) => {
    //   const mouseX = e.clientX;
    //   const mouseY = e.clientY;
    //   const distanceX = mouseX - positionX.get();
    //   const distanceY = mouseY - positionY.get();
    //   const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    //   if (distance <= 150) {
    //     newValInterval = 200;
    //     console.log(index, positionX.get());

    //     positionX.set(mouseX - distanceX / 2); // Adjust the position based on distance
    //     positionY.set(mouseY - distanceY / 2); // Adjust the position based on distance
    //     console.log(positionX.get());
    //   } else {
    //     newValInterval = 20000;
    //   }
    // };
    // useEffect(() => {
    //   window.addEventListener("mousemove", handleMouseMove);
    //   return () => {
    //     window.removeEventListener("mousemove", handleMouseMove);
    //   };
    // });

    return (
      <motion.div
        initial={{
          scale: 1.2,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 3,
          delay: 0.2,
        }}
      >
        <motion.div
          key={index}
          className={clsx(
            "absolute",
            "bg-opacity-10 rounded-full blur-2xl",
            color,
            "-translate-x-1/2 -translate-y-1/2",
            "ease-linear infinite"
          )}
          style={{
            width: `${size / 4}rem`,
            height: `${size / 4}rem`,
            x: useMotionTemplate`${positionX}px`,
            y: useMotionTemplate`${positionY}px`,
            translateX: "-50%",
            translateY: "-50%",
            transition: `all ${newValInterval / 1000}s `,
          }}
        />
      </motion.div>
    );
  }
);
