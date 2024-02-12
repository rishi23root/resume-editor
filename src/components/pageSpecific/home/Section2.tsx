import AmimateText from "@/components/custom/AmimateText";
import Link from "next/link";
import React from "react";

function Section2({ editorLink }: { editorLink: string }) {
  return (
    <section className=" min-h-[65vh] fc fce ">
      <div className="text-center text-neutral-200 lg:text-[4.5rem] md:text-[3rem] text-[1.3rem]  font-semibold">
        <AmimateText
          text="#ForTheStudentsByTheStudents"
          className="inline-block"
        />
      </div>
      <div className="flex items-center justify-center px-8 py-3 shadow lg:gap-24 bg-gradient-to-r from-blue-600 to-fuchsia-500 rounded-xl">
        <div className=" text-neutral-200 md:text-[35px] font-semibold">
          Create your Professional Package <br />
          Today !
        </div>
        <div className="flex items-center justify-center p-2 px-4 border rounded-lg bg-neutral-100 border-stone-500">
          <Link
            href={editorLink}
            className="font-medium text-center md:text-xl text-zinc-700"
          >
            Build My Resume
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Section2;
