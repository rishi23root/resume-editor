import { templateWithImages } from "@/types/utils";
import Image from "next/image";
import Link from "next/link";

async function GetTemplates({
  templateData,
}: {
  templateData: templateWithImages[];
}) {
  return (
    <div className="items-center w-full md:w-1/6 fc glass md:h-full h-2/6">
      <h1 className="self-start mb-4 text-2xl">Templates</h1>
      <div className="flex-1 w-full h-24 gap-6 m-1 overflow-scroll overflow-y-hidden fr md:fc md:overflow-x-hidden md:overflow-y-scroll">
        {templateData.map((ele) => {
          return (
            <Link
              href={{
                pathname: `/Templates/`,
                query: {
                  TemplateName: ele.name,
                },
              }}
              key={ele.id}
              className="md:w-[90%] fc  flex  "
            >
              <Image
                src={ele.pages[0]}
                width={300}
                height={300}
                alt="test"
                className="flex-1 object-cover w-20 rounded-sm md:w-fit"
              />
              <span className="text-[#ffffff90] capitalize pt-1">
                {ele.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default GetTemplates;
