"use client";

import RenderCompleted from "@/hooks/RenderCompleted";
import { templateWithImages } from "@/types/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Render({ templateData }: { templateData: templateWithImages[] }) {
  // get template name from parameters
  const router = useRouter();
  const templateName = useSearchParams().get("TemplateName");
  const [images, setImages] = useState<string[]>([]);
  const isRendered = RenderCompleted();

  useEffect(() => {
    if (!templateName) {
      router.push("/Templates?TemplateName=twoColumn");
    }
    // console.log(templateData, templateName);
    const currentTemplateImage = templateData.filter(
      (data) => data.name === templateName
    );
    if (currentTemplateImage.length > 0) {
      setImages(currentTemplateImage[0].pages);
    }
  }, [templateName]);

  if (isRendered) {
    return (
      <div className="w-full gap-4 md:h-[42rem] md:fr fc">
        <div className="items-start flex-1 fc glass ">
          {images.length > 0 && (
            <>
              <Image
                src={images ? images[0] : "null"}
                width={400}
                height={600}
                alt="testing"
                className="rounded-sm w-fit md:w-4/6 xl:w-2/6 lg:w-3/6"
              />
              <button className="p-3 my-2 text-xl capitalize bg-blue-500 border rounded-md">
                use Template
              </button>
            </>
          )}
          {images.length == 0 && (
            <div className="self-center w-full m-auto text-2xl text-center text-red-100">
              <span className="font-bold text-white">Template: {templateName}</span>
			  <br />
              It seems not in the template database yet :(
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}

export default Render;
