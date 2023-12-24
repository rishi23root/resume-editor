// working under issue #35

// this component have single task to show pdf file in the browser
// using react-pdf library
// take pdf file as props and show it in the browser or take id to request pdf file from server

"use client";

import { trpc } from "@/serverTRPC/client";

function PDFviewer() {
  // const { data } = trpc.hello2.useQuery({ text: "tesing the world" });

  // const { data : data2 } = trpc.jobDescription.useQuery({
  //   jobId: 1,
  // })

  // console.log("this is the way: ");
  // console.log("this is the way: ",data2);

  return (
    <div className="items-center w-full md:w-[60%] fc glass md:h-full h-1/2">
      {/* {data?.greeting} */}
    </div>
  );
}

export default PDFviewer;
