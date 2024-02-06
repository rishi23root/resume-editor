import { Loadingstate } from "@/components/Fallbacks";
import GetTemplates from "@/components/pageSpecific/templates/AllTemplatesNav";
import Render from "@/components/pageSpecific/templates/Render";
import { templateWithImages } from "@/types/templates";

import { PageProps } from "@/types/utils";
import { urlWithAddedParams } from "@/utils/paramHandeler";
import { getTemplateDataWithImages } from "@/utils/util";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Template(props: PageProps) {
  var templateData;
  try {
    //
    if (!props.searchParams.error) {
      templateData = await getTemplateDataWithImages();
    }
    templateData = [] as templateWithImages[];
  } catch (err) {
    redirect(
      urlWithAddedParams("/Templates", props.searchParams, {
        error: "unable to fetch data, server must be down ! ",
      })
    );
  }
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
