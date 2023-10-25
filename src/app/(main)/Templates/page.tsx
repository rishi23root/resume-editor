import GetTemplates from "@/components/pageSpecific/templates/AllTemplatesNav";
import dynamic from "next/dynamic";

const Render = dynamic(
  () => import("@/components/pageSpecific/templates/Render")
);

import { getTemplateDataWithImages } from "@/utils/util";
import { Suspense } from "react";

export default async function Template() {
  const templateData = await getTemplateDataWithImages();

  return (
    <div className="w-full gap-4 md:h-[42rem] md:fr fc">
      <GetTemplates templateData={templateData} />
      <Suspense fallback={<Loadingstate />}>
        <Render templateData={templateData} />
      </Suspense>
    </div>
  );
}

function Loadingstate() {
  return (
    <div className="text-center text-white border">loading please wait </div>
  );
}
