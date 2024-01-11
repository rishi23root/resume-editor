import BuilderClient from "@/components/pageSpecific/builder/BuilderClient";
import { MakePaymentComponent } from "@/components/pageSpecific/payment/payment";
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
    <main className="flex-1 fr gap-4 max-h-[75vh] relative">
      {/* if payment if not completed then complete the payment */}
      {activeResumeInstance.paymentStatus == "pending" && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[50%] border border-green-400 bg-white text-black p-4">
          <MakePaymentComponent payId={activeResumeInstance.payId} />
        </div>
      )}
      <BuilderClient
        userId={userDBid as string}
        searchParams={props.searchParams}
        defaultData={defaultData}
        activeResumeInstance={activeResumeInstance}
      />
    </main>
  );
}
