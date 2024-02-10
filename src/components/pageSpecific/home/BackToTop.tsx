"use client";

import { useAnimation, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

function BackToTopBtn() {
  const [scrollY, setScrollY] = useState(0);

  // Control animation using Framer Motion
  const controls = useAnimation();

  // Effect to update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to trigger animation when scroll is more than 50%
  useEffect(() => {
    if (scrollY > 50) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [scrollY, controls]);

  // JSX for the component
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="bg-[#6c11ed] font-bold fixed z-50 bottom-4 right-4 rounded-lg shadow-lg text-white text-lg px-4 py-2 hover:bg-[#4d0d9b] transition-all duration-300 ease-in-out cursor-pointer"
    >
      ↑ Back to Top
    </motion.button>
  );
}

export default BackToTopBtn;
