"use client";

import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import React, { useMemo } from "react";
import { useEffect } from "react";

export function BubbleUnderlay({
  className,
}: {
  className?: string;
}): React.ReactElement {
  //   cover for the whole screen
  const numBubbles = useMemo(
    () => Math.floor(Math.random() * 10) + Math.floor(window.innerHeight / 100),
    []
  );

  // Default values
  const bubbleColors = [
    "bg-sky-400",
    "bg-purple-600",
    "bg-amber-300",
    "bg-orange-400",
  ];
  const bubbleSizes = [64, 96, 72, 80];

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
              // chose a random color and size for each bubble
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

function Bubble({
  index,
  color,
  size,
}: {
  index: number;
  color: string;
  size: number;
}) {
  // get screen width and height
  // put the bubble in a random position on the screen
  let randomWidth = Math.random() * window.innerWidth;
  let randomHeight = Math.random() * window.innerHeight;
  const positionX = useMotionValue(randomWidth);
  const positionY = useMotionValue(randomHeight);
  // create a motion animation for each bubble randomly attracts towords the mouse is mouse in 300px radius
  // console.log("rendering bubble");

  useEffect(() => {
    var randomWidth = (Math.random() * 1.5 - 0.5) * window.innerWidth;
    var randomHeight = (Math.random() * 1.5 - 0.5) * window.innerHeight;
    // console.log(randomHeight, randomWidth);
    positionX.set(randomWidth);
    positionY.set(randomHeight);
    const intervalIns = setInterval(() => {
      var randomWidth = (Math.random() * 1.5 - 0.5) * window.innerWidth;
      var randomHeight = (Math.random() * 1.5 - 0.5) * window.innerHeight;
      // console.log(randomHeight, randomWidth);
      positionX.set(randomWidth);
      positionY.set(randomHeight);
    }, 20000);

    window.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const distanceX = mouseX - positionX.get();
      const distanceY = mouseY - positionY.get();
      const distance = Math.sqrt(
        Math.pow(distanceX, 2) + Math.pow(distanceY, 2)
      );
      if (distance <= 150) {
        positionX.set(mouseX);
        positionY.set(mouseY);
      }
    });
    return () => {
      clearInterval(intervalIns);
      window.removeEventListener("mousemove", () => {});
    };
  });

  return (
    <motion.div
      initial={{
        scale: 1.2,
      }}
      animate={{
        scale: 1,
      }}
      transition={{
        duration: 5,
        delay: 0.5,
      }}
    >
      <motion.div
        key={index}
        className={clsx(
          "absolute",
          "bg-opacity-10 rounded-full blur-2xl",
          color,
          "-translate-x-1/2 -translate-y-1/2",
          "duration-[21s] ease-linear infinite"
        )}
        style={{
          width: `${size / 4}rem`,
          height: `${size / 4}rem`,
          x: useMotionTemplate`${positionX}px`,
          y: useMotionTemplate`${positionY}px`,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </motion.div>
  );
}
