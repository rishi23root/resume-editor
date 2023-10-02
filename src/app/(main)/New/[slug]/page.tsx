import { cn } from "@/lib/utils";
import { type PageProps } from "@/types/utils";
import { checkIfFromLinkedin } from "@/utils/serverActions/pageLoad";
import Image from "next/image";

export default async function NewSlugPage(props: PageProps) {
  console.log(props);
  const ifLinkedIn = await checkIfFromLinkedin();
  // console.log(ifLinkedIn);

  if (!ifLinkedIn) {
    // render according to the current user authorization
    return (
      <div className="w-full gap-8 fc fcc md:glass">
        <div className="mb-4 text-4xl text-center md:text-5xl">
          Chose your Data Source !
        </div>
        <div className="gap-8 md:fr fc">
          <div className="min-w-[24.5rem] h-64 overflow-hidden duration-75 shadow-2xl cursor-pointer rounded-xl glass hover:scale-105 bg-linkedin">
            <div className="w-full gap-3 fcc fc ">
              <Image
                src={"/svgs/linkedin.svg"}
                width={30}
                height={30}
                alt="linkedin.svg"
                className="w-32 h-32 left-7 top-7 drop-shadow-lg"
              />
              <div className="text-center">
                <div className="text-xl font-bold">
                  Import data From your Profile{" "}
                </div>
                <div className="text-xs text-center text-white text-opacity-70">
                  Our Ai will take the lead from here, you will be
                  <br />
                  able to update data in later phases
                </div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "min-w-[24.5rem] h-64 overflow-hidden duration-75 shadow-2xl cursor-pointer rounded-xl noisebg glass hover:scale-105",
              "border-dashed border-4 text-center"
            )}
          >
            <div className="w-full h-full gap-2 text-center fcc fc">
              <div className="text-3xl">
                <Image
                  src={"/svgs/upload.png"}
                  height={60}
                  width={60}
                  alt="upload icon"
                  className="invert"
                />
              </div>
              <div className="text-xl font-bold">
                or Upload your pdf to parse
              </div>
              <div className="text-xs text-center text-white text-opacity-70">
                Our Ai will take the lead from here, you will be
                <br />
                able to update data in later phases
              </div>
            </div>
          </div>
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
        <div
          className={cn(
            "min-w-[24.5rem] h-64 overflow-hidden duration-75 shadow-2xl cursor-pointer rounded-xl noisebg glass hover:scale-105",
            "border-dashed border-4 text-center"
          )}
        >
          <div className="w-full h-full gap-2 text-center fcc fc">
            <div className="text-3xl">
              <Image
                src={"/svgs/upload.png"}
                height={60}
                width={60}
                alt="upload icon"
                className="invert"
              />
            </div>
            <div className="text-xl font-bold">or Upload your pdf to parse</div>
            <div className="text-xs text-center text-white text-opacity-70">
              Our Ai will take the lead from here, you will be
              <br />
              able to update data in later phases
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
