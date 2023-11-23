import { PageProps } from "@/types/utils";
import useParamParser from "@/utils/paramHandeler";

export default async function builderPage(props: PageProps) {
  const { stringifiedData, privateData } = await useParamParser(
    "/Builder",
    props.searchParams
  );
  console.log("from builder: ", stringifiedData, privateData);
  // if no prams then redirect to the dashboard
  return (
    // make whole page with 10/12 width and center it on above medium screens
    <main className="glass flex-1">
      <div className=""></div>
      this is builder page main action here is to build the page
    </main>
  );
}
