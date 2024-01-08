import BuilderClient from "@/components/pageSpecific/builder/BuilderClient";
import { serverAPI } from "@/serverTRPC/serverAPI";
import { PageProps } from "@/types/utils";

export default async function Test(props: PageProps) {
  // var data = await serverAPI.builder.getDefault({
  //   jobId: parseInt(props.searchParams.jobId as string),
  // });

  return (
    <div className="flex border p-2 m-auto w-1/3 h-[50em]">
      {/* <BuilderClient searchParams={props.searchParams} defaultData={data} /> */}
    </div>
  );
}
