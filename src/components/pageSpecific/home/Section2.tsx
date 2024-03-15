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
      <a
        href="https://www.producthunt.com/posts/build-your-resume?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-build&#0045;your&#0045;resume"
        target="_blank"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=445023&theme=neutral"
          alt="Build&#0032;Your&#0032;Resume - Use&#0032;latex&#0032;to&#0032;genetate&#0032;resume&#0032;in&#0032;seconds&#0032;online | Product Hunt"
          style={{ width: "250px", height: "54px" }}
          className="shadow-lg shadow-[#919191d9] rounded-lg"
        />
      </a>
      {/* src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=445023&theme=" */}
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
