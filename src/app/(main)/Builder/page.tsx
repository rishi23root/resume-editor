import BuilderClient from "@/components/pageSpecific/builder/BuilderClient";
import { makeEmptyObject } from "@/lib/utils";
import { serverAPI } from "@/serverTRPC/serverAPI";
import { PageProps } from "@/types/utils";
import {
  builderPageParamsRedirectHandeler,
  builderPageParamsValidator,
} from "@/utils/pageLoad";
import useParamParser from "@/utils/paramHandeler";
import { currentUser } from "@clerk/nextjs";

export default async function builderPage(props: PageProps) {
  const { stringifiedData, privateData } = await useParamParser(
    "/Builder",
    props.searchParams
  );
  console.log("from builder: ", stringifiedData, privateData);

  await builderPageParamsRedirectHandeler(props);
  const activeResumeInstance = await builderPageParamsValidator(props);
  // console.log("varified json id: ", activeResumeInstance);

  const user = await currentUser();
  const userDBid = user?.privateMetadata.userDBid;

  // now we got varified json data id use that id to get the data from db of that id only
  var defaultData = await serverAPI.builder.getDataByResumeId({
    id: activeResumeInstance.id,
    userId: userDBid as string,
  });

  return (
    <main className="flex-1 fr gap-4 max-h-[75vh]">
      <BuilderClient
        userId={userDBid as string}
        searchParams={props.searchParams}
        defaultData={defaultData}
        activeResumeInstance={activeResumeInstance}
      />
    </main>
  );
}
