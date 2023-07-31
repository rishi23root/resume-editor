'use client'
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
    if (textEle.current) {
      textEle.current.innerText = randomstring().join("");
    }

    setTimeout(() => {
      interval = setInterval(() => {
        const random = randomstring();
        if (textEle.current) {
          textEle.current.innerText = random.join("");
        }
      }, 20);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [textEle, text]);

  return <div ref={textEle} className={className}></div>;
}
