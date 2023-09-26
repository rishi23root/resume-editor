import { type PageProps } from "@/types/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
// page route /New

// user to create new resume
// possibel search params are = mode, templateName, resumeId
// parameters=> mode ['newResume', 'newLogin']
// if newResume{
// go to any one page and
//     templateName [all list of templates]
// }

export default function New(props: PageProps) {
  if (!props.searchParams?.mode) {
    redirect("/New?mode=newResume");
  } else if (props.searchParams?.mode == "newResume") {
    // console.log(props);
  } else if (props.searchParams?.mode == "newLogin") {
    // ask user to upload the user from pc or load from linkedin or start generating the resume data
    // ask user to use upload resume
  }
  // show templates and ask user for his choices to template to use
  // and show old build resume if use that to create new or upload a resume to parse it

  {
    /* {props.searchParams &&
    Object.keys(props.searchParams).map((key) => {
      return (
        <div className="text-xl " key={key}>
          {key} = {props.searchParams[key]}
        </div>
      );
    })} */
  }
  return (
    <div className="w-full gap-8 fc fcc md:glass">
      <div className="text-5xl text-center">How do you want to proceed ?</div>
      <div className="gap-8 fc">
        <div className="gap-8 md:fr fc">
          <Link
            href={"/404fornow"}
            className="w-full h-64 overflow-hidden duration-75 shadow-2xl cursor-pointer rounded-xl glass hover:scale-105"
          >
            <div className="w-full gap-4 translate-y-2 fcc fc">
              <div className="fcc fc">
                <div className="text-2xl font-medium text-white ">
                  Import from LinkedIn
                </div>
                <div className="text-sm font-medium text-center text-white text-opacity-70 ">
                  Leverage from your optimized linkedin profile.
                </div>
              </div>
              <div className="relative p-1 ">
                <Image
                  src={"/svgs/linkedinResume.svg"}
                  width={300}
                  height={200}
                  alt="linkedinResume.svg"
                />
                <Image
                  src={"/svgs/linkedin.svg"}
                  width={30}
                  height={20}
                  alt="linkedin.svg"
                  className="absolute left-6 top-6"
                />
              </div>
            </div>
          </Link>
          <Link
            href={"/404fornow"}
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
          className="w-full duration-75 cursor-pointer glass fcc fc hover:scale-105"
        >
          <div className="text-2xl font-medium text-white ">
            Choose from your existing resume
          </div>
          <div className="text-sm font-medium text-center text-white text-opacity-70 ">
            load existing resume data
          </div>
        </Link>
      </div>
    </div>
  );
}
