import GetTemplates from "@/components/pageSpecific/templates/AllTemplatesNav";
import dynamic from "next/dynamic";

const Render = dynamic(
  () => import("@/components/pageSpecific/templates/Render")
);

import { Loadingstate } from "@/components/Fallbacks";
import { PageProps } from "@/types/utils";
import useParamParser from "@/utils/paramHandeler";
import { getTemplateDataWithImages } from "@/utils/util";
import { Suspense } from "react";

export default async function Template(props: PageProps) {
  const templateData = await getTemplateDataWithImages();

  const { stringifiedData, privateData } = await useParamParser(
    "/Templates",
    props.searchParams
  );
  console.log("from templates: ", stringifiedData, privateData);

  // props.searchParams._s = privateData;
  // // console.log(stringifiedData);
  // console.log(props.searchParams);
  return (
    <div className="w-full gap-4 md:h-[42rem] md:fr fc">
      <GetTemplates templateData={templateData} />
      <Suspense fallback={<Loadingstate className="text-xl" />}>
        <Render templateData={templateData} />
      </Suspense>
    </div>
  );
}
