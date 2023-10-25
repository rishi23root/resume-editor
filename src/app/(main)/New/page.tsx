import { type PageProps } from "@/types/utils";
import { handlePageProps } from "@/utils/serverActions/pageLoad";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function New(props: PageProps) {
  const pageProps = await handlePageProps("/New", props);

  // const { stringifiedData, privateData } = useParamParser(props.searchParams);
  // console.log(
  //   stringifiedData,
  //   privateData,
  //   encodeJSONToBase64,
  //   jsonToSearchParameters
  // );

  // if (!props.searchParams?.mode) {
  //   redirect("/New?mode=newResume");
  // } else if (props.searchParams?.mode == "newResume") {
  //   // console.log(props);
  // } else if (props.searchParams?.mode == "newLogin") {
  //   // ask user to upload the user from pc or load from linkedin or start generating the resume data
  //   // ask user to use upload resume
  // }

  return (
    <div className="w-full gap-8 fc fcc md:glass">
      <div className="mb-4 text-4xl text-center md:text-5xl">
        How do you want to proceed ?
      </div>
      <div className="gap-8 fc">
        <div className="gap-8 md:fr fc">
          <Link
            href={"/New/parsePDF"}
            className="w-full h-64 overflow-hidden duration-75 shadow-2xl cursor-pointer rounded-xl glass hover:scale-105"
          >
            <div className="w-full gap-4 translate-y-2 fcc fc">
              <div className="fcc fc">
                <div className="text-2xl font-medium text-white ">
                  Import from LinkedIn / PDF
                </div>
                <div className="text-sm font-medium text-center text-white text-opacity-70 ">
                  Import from your linkedin profile or resume pdf.
                </div>
              </div>
              <div className="relative p-1 ">
                <Image
                  className="w-auto h-auto"
                  src={"/svgs/linkedinResume.svg"}
                  width={300}
                  height={200}
                  alt="linkedinResume.svg"
                />
                <Image
                  src={"/svgs/linkedin.svg"}
                  width={10}
                  height={10}
                  alt="linkedin.svg"
                  className="absolute w-10 h-10 left-7 top-7 "
                />
              </div>
            </div>
          </Link>
          <Link
            href={"/Templates"}
            className="w-full h-64 overflow-hidden duration-75 shadow-2xl cursor-pointer rounded-xl glass hover:scale-105"
          >
            <div className="w-full gap-4 translate-y-2 fcc fc">
              <div className="fcc fc">
                <div className="text-2xl font-medium text-white ">
                  Create a New Resume
                </div>
                <div className="text-sm font-medium text-center text-white text-opacity-70 ">
                  Start Fresh. We’ll guide you step by step.
                </div>
              </div>
              <div className="relative p-1 ">
                <Image
                  className="w-auto h-auto"
                  src={"/svgs/resume.svg"}
                  width={300}
                  height={200}
                  alt="resume.svg"
                />
              </div>
            </div>
          </Link>
        </div>
        <Link
          href={"/404fornow"}
          className="w-full text-center duration-75 cursor-pointer glass fcc fc hover:scale-105"
        >
          <div className="text-2xl font-medium text-white ">
            Choose from your existing resume
          </div>
          <div className="text-sm font-medium text-center text-white text-opacity-70 ">
            load existing resume data
          </div>
        </Link>
        <Link
          href={"/New/jsonResume"}
          className="w-full text-center duration-75 cursor-pointer glass fcc fc hover:scale-105"
        >
          <div className="text-2xl font-medium text-white ">
            or upload your jsonresume schema template
          </div>
          <div className="text-sm font-medium text-center text-white text-opacity-70 ">
            click to know more information
            {/* &nbsp;
            <div
              href={"https://jsonresume.org/getting-started/"}
              target="_blank"
              className="group hover:scale-105 opacity-95"
            >
              <span className="group-hover:italic">
                https://jsonresume.org/getting-started/
              </span>
              <span className="invisible group-hover:visible ">
                &nbsp;--&raquo;
              </span>
            </div>   */}
          </div>
        </Link>
      </div>
    </div>
  );
}
