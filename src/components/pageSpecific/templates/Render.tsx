"use client";

import { Button } from "@/components/ui/button";
import RenderCompleted from "@/hooks/RenderCompleted";
import useRedirectHandler from "@/hooks/redirectionHandlers";
import { cn } from "@/lib/utils";
import { resumeTemplates, templateWithImages } from "@/types/templates";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Render({ templateData }: { templateData: templateWithImages[] }) {
  // get template name from parameters
  const templateName =
    (useSearchParams().get("templateName") as resumeTemplates) ||
    "singleColumn";
  const [images, setImages] = useState<string[]>([]);
  const isRendered = RenderCompleted();
  const { urlWithAddedParams } = useRedirectHandler();

  useEffect(() => {
    const currentTemplateImage = templateData.filter(
      (data) => data.name === templateName
    );
    if (currentTemplateImage.length > 0) {
      setImages(currentTemplateImage[0].pages);
    }
  }, [templateName]);

  // check if we have a param of redirectPage in the url
  const searchParams = useSearchParams();
  const redirectPage = searchParams.get("redirectPage");
  // if we have a redirectPage param then we will redirect to that page
  const toRedirectUrl = redirectPage
    ? urlWithAddedParams(redirectPage, { templateName }, { procegure: 4 })
    : urlWithAddedParams("/Payment", { templateName }, { procegure: 3 });

  if (isRendered) {
    return (
      <>
        {images.length > 0 && (
          <div className="flex-1 fr gap-4 overflow-auto m-auto border border-green-100">
            <Suspense fallback={"loading image please wait"}>
              <Image
                src={images ? images[0] : "null"}
                width={400}
                height={600}
                alt="template Image "
                className="rounded-sm h-full w-full"
              />
            </Suspense>
          </div>
        )}

        {images.length > 0 && (
          <Button
            className={cn(
              "p-3 my-2 lg:text-2xl text-xl capitalize bg-blue-500 rounded-md m-auto text-white text-center fcc",
              "transition ease-in-out delay-150", //animate
              "hover:bg-white hover:shadow-lg hover:rounded-lg hover:shadow-zinc-500 hover:text-black",
              images.length == 1 ? "w-[50%]" : "w-[90%]"
            )}
          >
            <Link href={toRedirectUrl} className="w-full ">
              use Template
            </Link>
          </Button>
        )}

        {images.length == 0 && (
          <div className="self-center w-full m-auto text-2xl text-center text-red-100">
            <span className="font-bold text-white">
              Template: {templateName}
            </span>
            <br />
            It seems not in the template database yet :(
          </div>
        )}
      </>
    );
  }
  return null;
}

export default Render;
