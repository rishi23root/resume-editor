import { cn } from "@/lib/utils";
import { resumeTemplates, templateWithImages } from "@/types/templates";
import { PageProps } from "@/types/utils";
import Image from "next/image";
import Link from "next/link";

async function GetTemplates({
  templateData,
  pageParams,
}: {
  templateData: templateWithImages[];
  pageParams: PageProps["searchParams"];
}) {
  const templateName =
    (pageParams["templateName"] as resumeTemplates) || "singleColumn";
  return (
    <div className="items-center w-full md:w-1/6 fc glass md:h-full h-2/6">
      <h1 className="self-start mb-4 sm:text-2xl md:text-sm lg:text-2xl ">
        Templates
      </h1>
      <div className="flex-1 w-full h-24 gap-6 m-1 overflow-scroll overflow-y-hidden fr md:fc md:overflow-x-hidden md:overflow-y-scroll">
        {templateData.reverse().map((ele) => {
          return (
            <Link
              href={{
                pathname: `/Templates/`,
                query: {
                  ...(pageParams as any),
                  templateName: ele.name,
                },
              }}
              key={ele.id}
              className="md:w-[90%] fc  flex  "
            >
              <div
                className={cn(
                  ele.name === templateName &&
                    "bg-gradient-to-r from-blue-600 to-fuchsia-500 p-[0.15rem] rounded-sm shadow-lg"
                )}
              >
                <Image
                  src={ele.pages[0]}
                  width={300}
                  height={300}
                  alt="test"
                  className="flex-1 object-cover w-20 rounded-sm md:w-fit"
                />
              </div>
              <span
                className={cn(
                  "text-[#ffffff90] capitalize pt-1",
                  ele.name === templateName &&
                    "underline underline-offset-4 decoration-blue-500/40"
                )}
              >
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
