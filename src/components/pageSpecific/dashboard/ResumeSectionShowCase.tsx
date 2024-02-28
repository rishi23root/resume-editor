"use client";
import React, { Suspense } from "react";
import ResumeCard, { ResumeSectionShowCase } from "./utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { resumeDataprops } from "@/types/builder";

export function DashboardMain({
  allResumeWithData,
}: {
  allResumeWithData: resumeDataprops[];
}) {
  const dayLimit = 7;

  // filter out all the active resume which are paid and created in last 14 days
  const activeResumes = allResumeWithData.filter(({ creaatedAt }) => {
    const date = new Date(creaatedAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = diff / (1000 * 3600 * 24);
    return diffDays <= dayLimit;
  });

  return (
    <>
      <ResumeSectionShowCase
        title={
          <>
            Active Resume{" "}
            <span className="opacity-25 text-sm">/ {dayLimit} days</span>
          </>
        }
      >
        <Link href="/New" className="h-auto">
          <motion.div
            key={"id"}
            className={cn(
              "cursor-pointer border-2 w-40 shadow-lg shadow-gray-900 border-dashed  border-gray-700 bg-gray-700/30 flex flex-col justify-center items-center  p-4 rounded-md gap-2 h-full",
              "hover:border-gray-500/50 hover:bg-gray-500/50 hover:shadow-gray-500/50",
              "max-h-[15em]"
            )}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              // redict user to a new builder page
            }}
          >
            <div>
              <Image
                src={"/svgs/addNew.svg"}
                height={20}
                width={20}
                alt="this is add"
                className="group-hover:invert"
              />
            </div>
            New
          </motion.div>
        </Link>

        {activeResumes.map((resume) => (
          <Suspense key={resume.id}>
            <ResumeCard key={resume.id} resume={resume} />
          </Suspense>
        ))}
      </ResumeSectionShowCase>
      <ResumeSectionShowCase title="All Resume">
        {allResumeWithData.map((resume) => (
          <Suspense key={resume.id}>
            <ResumeCard key={resume.id} resume={resume} />
          </Suspense>
        ))}
      </ResumeSectionShowCase>
    </>
  );
}

export default ResumeSectionShowCase;
