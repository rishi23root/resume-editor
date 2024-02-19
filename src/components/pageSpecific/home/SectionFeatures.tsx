"use client";
import React from "react";
import { motion } from "framer-motion";

function SectionFeatures({ editorLink }: { editorLink: string }) {
  return (
    <section id="features" className="">
      <div className="w-full h-full gap-16 text-center fc fss">
        {/* text */}
        <div className="w-full gap-2 fc fcc">
          <div className="text-neutral-200 text-[3rem] font-bold ">
            Services that make your life easier.
          </div>
          <div className="opacity-50">
            We go above and beyond to make sure you&lsquo;re satisfied.
          </div>
        </div>
        {/* cards */}
        <div className="self-stretch gap-4 fc fcc">
          {/* card row */}
          <div className="flex-wrap self-stretch gap-4 fcc">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="cursor-pointer featureCard glass fc fcb"
            >
              <div className="w-[19rem] text-[1.8rem] font-bold leading-tight">
                Built-in ATS Support
              </div>
              <div className="text-xl font-medium text-white text-opacity-70">
                Ensure Your Resume Gets Noticed
              </div>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="cursor-pointer featureCard glass fc fcb"
            >
              <div className="w-[19rem] text-[1.8rem] font-bold leading-tight">
                Built-in AI Integration
              </div>
              <div className="text-xl font-medium text-white text-opacity-70">
                Optimize Your Resume with Expert recommendation
              </div>
            </motion.div>
          </div>
          <div className="flex flex-wrap items-center self-stretch justify-center gap-4">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="cursor-pointer featureCard glass fc fcb"
            >
              <div className="w-[19rem] text-[1.8rem] font-bold leading-tight">
                Top-Performing Template
              </div>
              <div className="text-xl font-medium text-white text-opacity-70">
                Impress Employers with className
              </div>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="cursor-pointer featureCard glass fc fcb"
            >
              <div className="w-[19rem] text-[1.8rem] font-bold leading-tight">
                Mentor Review
              </div>
              <div className="text-xl font-medium text-white text-opacity-70">
                Receive Expert Feedback for Resume Perfection
              </div>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="cursor-pointer featureCard glass fc fcb"
            >
              <div className="w-[19rem] text-[1.8rem] font-bold leading-tight">
                Easy and Effortless
              </div>
              <div className="text-xl font-medium text-white text-opacity-70">
                Create Your Resume in a Few Clicks
              </div>
            </motion.div>
          </div>
          <div className="inline-flex flex-wrap items-center self-stretch justify-center gap-4">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="cursor-pointer featureCard glass fc fcb"
            >
              <div className="w-[19rem] text-[1.8rem] font-bold leading-tight">
                Affordable Rates for Students
              </div>
              <div className="text-xl font-medium text-white text-opacity-70">
                Kick-start Your Career Without Breaking the Bank
              </div>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="cursor-pointer featureCard glass fc fcb"
            >
              <div className="w-[19rem] text-[1.8rem] font-bold leading-tight">
                No Hidden Charges
              </div>
              <div className="text-xl font-medium text-white text-opacity-70">
                {" "}
                Transparent Pricing, No Surprises
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionFeatures;
