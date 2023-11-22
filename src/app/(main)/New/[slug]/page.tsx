import ExtractLinkedinProfile from "@/components/elements/extractLinkedinProfile";
import UploadResume from "@/components/elements/upload";
import { PrivateMetadata } from "@/types/user";
import { type PageProps } from "@/types/utils";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

export default async function NewSlugPage(props: PageProps) {
  // slug can be --> jsonResume |  parsePDF
  const user = await currentUser();
  const ifLinkedIn = (user?.privateMetadata as PrivateMetadata).linkedin;

  if (ifLinkedIn && props.params.slug !== "jsonResume") {
    // render according to the current user authorization
    return (
      <div className="w-full gap-8 fc fcc md:glass">
        <div className="mb-4 text-4xl text-center md:text-5xl">
          Chose your Data Source !
      </div>
        <div className="gap-8 md:fr fc">
          <ExtractLinkedinProfile />
          <UploadResume />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full gap-8 fc fcc md:glass">
      <div className="mb-4 text-4xl text-center md:text-5xl">
        Extract your data from linked-in or Any other PDF ;)
      </div>
      <div className="gap-8 md:fr fc">
        <div className="min-w-[24.5rem] h-64 overflow-hidden duration-75 shadow-2xl cursor-pointer rounded-xl ">
          <Image
            src={"/svgs/animated-linkedin-new.gif"}
            height={400}
            width={400}
            alt="how to get pdf "
            className=""
          />
        </div>
        <UploadResume />
      </div>
    </div>
  );
}
