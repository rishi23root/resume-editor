import BuilderClient from "@/components/pageSpecific/builder/BuilderClient";
import { serverAPI } from "@/serverTRPC/serverAPI";
import { PageProps } from "@/types/utils";

export default async function testPage(props: PageProps) {
  const data = await serverAPI.builder.getDefault();
  return (
    <div>
      <BuilderClient searchParams={props.searchParams} defaultData={data} />
    </div>
  );
}
