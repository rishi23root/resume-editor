// "use client";

import { templateWithImages } from "@/types/utils";
import Image from "next/image";
import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
import TwScreenInfo from '../../../components/custom/TwScreenInfo';

async function getTemplateDataWithImages() {
  const res = await fetch(`${process.env.BACKEND}/templates`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  // loop through the names and get images data for each images
  let data: string[] = await res.json();

  // loop through the names and get images data for each
  const templatesWithImages: templateWithImages[] = await Promise.all(
    data.map(async (element, index) => {
      // const images = await fetch();
      const res = await fetch(
        `${process.env.BACKEND}/getTemplatePreview?templateName=${element}`
      );

      return {
        id: index,
        name: element,
        pages: res.ok ? await res.json() : [],
      };
    })
  );

  return templatesWithImages;
}

export default async function Template() {
  const templateData = await getTemplateDataWithImages();
  // const router = useRouter();
  // (router.getTemplate)
  //  const searchParams = useSearchParams();
  //  const search = searchParams.get("search");

  return (
    <div className="w-full gap-4 md:h-[42rem] md:fr fc">
      <div className="items-center w-full md:w-1/6 fc glass md:h-full h-2/6">
        <h1 className="self-start mb-4 text-2xl">Templates</h1>
        <div className="flex-1 w-full h-24 gap-6 m-1 overflow-scroll overflow-y-hidden fr md:fc md:overflow-x-hidden md:overflow-y-scroll">
          {templateData.map((ele) => {
            return (
              <Link
                href={{
                  pathname: `/Templates/`,
                  query: {
                    templateName: ele.name,
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
      <div className="items-start flex-1 fc glass ">
        <Image
          src={templateData[0].pages[0]}
          width={400}
          height={600}
          alt="testing"
          className="rounded-sm w-fit md:w-4/6 xl:w-2/6 lg:w-3/6"
        />
        <button className="p-3 my-2 text-xl capitalize bg-blue-500 border rounded-md">
          use Template
        </button>
      </div>
      <TwScreenInfo />
    </div>
  );
}
