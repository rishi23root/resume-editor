import GetTemplates from "@/components/dashboard/templates/AllTemplatesNav";
import Render from "@/components/dashboard/templates/Render";
import { getTemplateDataWithImages } from "@/utils/actions";
import { redirect } from "next/navigation";

// app/posts/page.ts
type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Template(props: Props) {
  const searchParams = props.searchParams;
  // if (!searchParams.hasOwnProperty("TemplateName")) {
  //   // console.log(searchParams);
  //   redirect(`/Templates?TemplateName=singleColumn`);
  // }
  const templateData = await getTemplateDataWithImages();

  return (
    <div className="w-full gap-4 md:h-[42rem] md:fr fc">
      <GetTemplates templateData={templateData} />
      <Render templateData={templateData} />
    </div>
  );
}
