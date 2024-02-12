"use client";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ{}()[]|/*.";

export default function AmimateText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const textEle = useRef<HTMLDivElement>(null);
  const isInView = useInView(textEle);
  const [isAnimated, setIsAnimated] = React.useState(false);

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timer;
    const randomstring = () => {
      return text.split("").map((letter, index) => {
        if (index < iteration) {
          // return event.target.dataset.value[index];
          return letter;
        }
        iteration += 1 / 10;
        return letter !== " "
          ? letters[Math.floor(Math.random() * letters.length)]
          : letter;
      });
    };
    if (textEle.current && !isAnimated) {
      textEle.current.innerText = randomstring().join("");
    }

    const overallDelay = setTimeout(() => {
      // textEle.current
      // when this component is in view
      if (isInView && !isAnimated) {
        interval = setInterval(() => {
          const random = randomstring();
          if (textEle.current) {
            textEle.current.innerText = random.join("");
          }
        }, 30);
        setIsAnimated(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(overallDelay);
    };
  }, [textEle, text, isInView]);

  return (
    <div
      ref={textEle}
      className={cn(className, "transition-all duration-500 ease-in-out ")}
    ></div>
  );
}
