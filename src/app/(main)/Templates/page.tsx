import GetTemplates from "@/components/pageSpecific/templates/AllTemplatesNav";
import dynamic from "next/dynamic";

const Render = dynamic(
  () => import("@/components/pageSpecific/templates/Render")
);

import { getTemplateDataWithImages } from "@/utils/util";
import { Suspense } from "react";
import { Loadingstate } from "@/components/Fallbacks";

export default async function Template() {
  const templateData = await getTemplateDataWithImages();

  return (
    <div className="w-full gap-4 md:h-[42rem] md:fr fc">
      <GetTemplates templateData={templateData} />
      <Suspense fallback={<Loadingstate className="text-xl" />}>
        <Render templateData={templateData} />
      </Suspense>
    </div>
  );
}
