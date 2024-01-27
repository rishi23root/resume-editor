import { Loadingstate } from "@/components/Fallbacks";
import GetTemplates from "@/components/pageSpecific/templates/AllTemplatesNav";
import Render from "@/components/pageSpecific/templates/Render";

import { PageProps } from "@/types/utils";
import useParamParser from "@/utils/paramHandeler";
import { getTemplateDataWithImages } from "@/utils/util";
import { Suspense } from "react";

export default async function Template(props: PageProps) {
  const templateData = await getTemplateDataWithImages();
  // const { stringifiedData, privateData } = await useParamParser(
  //   "/Templates",
  //   props.searchParams
  // );
  // console.log("from templates: ", stringifiedData, privateData);

  return (
    <div className="w-full gap-4 md:h-[42rem] md:fr fc">
      <GetTemplates
        templateData={templateData}
        pageParams={props.searchParams}
      />
      <div className="w-full flex-1 gap-4 fc items-start glass">
        <Suspense fallback={<Loadingstate className="text-xl" />}>
          <Render templateData={templateData} />
        </Suspense>
      </div>
    </div>
  );
}
