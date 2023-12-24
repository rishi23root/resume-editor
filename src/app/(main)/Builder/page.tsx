import FormManager from "@/components/pageSpecific/builder/FormElementManager";
import PDFviewer from "@/components/elements/PDFviewer";
import { serverAPI } from "@/serverTRPC/serverAPI";
import { PageProps } from "@/types/utils";
import {
  builderPageParamsRedirectHandeler,
  builderPageParamsValidator,
} from "@/utils/pageLoad";
import useParamParser from "@/utils/paramHandeler";

export default async function builderPage(props: PageProps) {
  const { stringifiedData, privateData } = await useParamParser(
    "/Builder",
    props.searchParams
  );
  console.log("from builder: ", stringifiedData, privateData);

  await builderPageParamsRedirectHandeler(props);
  await builderPageParamsValidator(props);

  // const data = await serverAPI.pdf.parse();
  return (
    <main className="flex-1 fr gap-4">
      <FormManager />
      <PDFviewer />
    </main>
  );
}

// for this page to work
// we need to have a data object   in the url inside _s (to the safe side, and it will be easy to work with in future) to extract the data from db
// if able to be extracted then we can build the page else redirect to error page
// that will be provided from the payment page on the success on the payment