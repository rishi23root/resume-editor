import GetTemplates from "@/components/dashboard/templates/AllTemplatesNav";
import Render from "@/components/dashboard/templates/Render";
import { getTemplateDataWithImages } from "@/utils/util";

export default async function Template() {
  const templateData = await getTemplateDataWithImages();

  return (
    <div className="w-full gap-4 md:h-[42rem] md:fr fc">
      <GetTemplates templateData={templateData} />
      <Render templateData={templateData} />
    </div>
  );
}
