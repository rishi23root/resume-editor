import { PageProps } from "@/types/utils";
import useParamParser from "@/utils/paramHandeler";
import { serverAPI } from "@/serverTRPC/serverAPI";
import FormManager from "@/components/pageSpecific/builder/FormElementManager";

export default async function builderPage(props: PageProps) {
  const { stringifiedData, privateData } = await useParamParser(
    "/Builder",
    props.searchParams
  );
  console.log("from builder: ", stringifiedData, privateData);
  // if no prams then redirect to the dashboard

  const data = await serverAPI.hello()
  
  return (
    // make whole page with 10/12 width and center it on above medium screens
    <main className="glass flex-1">
      <div className="">
        this is builder page main action here is to build the page
      </div>
      {data}
      <FormManager/>
    </main>
  );
}

// for this page to work
// we need to have a data object   in the url inside _s (to the safe side, and it will be easy to work with in future) to extract the data from db
// if able to be extracted then we can build the page else redirect to error page
// that will be provided from the payment page on the success on the payment
