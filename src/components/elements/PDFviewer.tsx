// working under issue #35

// this component have single task to show pdf file in the browser
// using react-pdf library
// take pdf file as props and show it in the browser or take id to request pdf file from server

"use client";

import { trpc } from "@/serverTRPC/client";

function PDFviewer({ enriched, state }: { enriched: boolean; state: string }) {
  // const { data } = trpc.hello2.useQuery({ text: "tesing the world" });

  // const { data : data2 } = trpc.jobDescription.useQuery({
  //   jobId: 1,
  // })

  // console.log("this is the way: ");
  // console.log("this is the way: ",data2);

  // api request to get the pdf by id and update it on event
  // api request to get the pdf ats score

  // setup model view here on click and mobile display

  return (
    <div className="items-center w-full md:w-[60%] fc glass md:h-full h-1/2">
      <div className="fr justify-between items-center w-full relative">
        <div className="opacity-80">
          {state !== "idle" ? state + "..." : ""}
        </div>
        <div className="text-xl absolute -translate-x-1/2 left-[50%]">
          Resume
        </div>
        <div className="opacity-80">{enriched ? "ATS Score: 8" : ""}</div>
      </div>

      {/* images and model for images */}
      <div className="flex-1  border border-greem-600">this is the waiy</div>
    </div>
  );
}

export default PDFviewer;
