import BuilderClient from "@/components/pageSpecific/builder/BuilderClient";
import { MakePaymentComponent } from "@/components/pageSpecific/payment/payment";
import NoSSR from "@/hooks/NoSSR";
import { serverAPI } from "@/serverTRPC/serverAPI";
import { PageProps } from "@/types/utils";
import {
  builderPageParamsRedirectHandeler,
  builderPageParamsValidator,
} from "@/utils/pageLoad";
import useParamParser from "@/utils/paramHandeler";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

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
  const userDBid = user?.privateMetadata?.userDBid;

  // now we got varified json data id use that id to get the data from db of that id only
  var defaultData = await serverAPI.builder.getDataByResumeId({
    resumeId: activeResumeInstance.id,
    userId: userDBid as string,
  });

  // console.log(
  //   "active data: ",
  //   activeResumeInstance.id,
  //   activeResumeInstance.paymentStatus,
  //   activeResumeInstance.payId
  // );

  return (
    <main className="flex-1 relative">
      {/* if payment if not completed then complete the payment */}
      {activeResumeInstance.paymentStatus == "pending" && (
        <NoSSR>
          <MakePaymentComponent
            resumeId={activeResumeInstance.id}
            payId={activeResumeInstance.payId}
          />
        </NoSSR>
      )}
      <BuilderClient
        searchParams={props.searchParams}
        defaultData={defaultData}
        activeResumeInstance={activeResumeInstance}
      />
    </main>
  );
}
