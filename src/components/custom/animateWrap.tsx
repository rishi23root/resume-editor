"use client";
// componet to wrap animations

import React from "react";
import { motion } from "framer-motion";

export const ScaleOnHover = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05, opacity: 1 }}
      className=""
    >
      {children}
    </motion.div>
  );
};
