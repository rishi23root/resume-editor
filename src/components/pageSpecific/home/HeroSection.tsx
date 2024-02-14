import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

function HeroSection({ editorLink }: { editorLink: string }) {
  return (
    <section className="fcb min-h-[55vh] my-10 justify-center md:gap-20 gap-8 md:justify-between  px-auto w-full fc md:fr">
      {/* text  */}
      <div className="flex flex-col justify-between h-full gap-8  md:max-w-[35em] w-full">
        <div className="  flex-col justify-start items-start gap-[2rem] flex  ">
          <h1 className="text-neutral-200 text-[1.5rem] font-semibold md:text-[3rem]">
            Build Your Professional
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-fuchsia-500 ">
              Résumé
            </span>{" "}
            with Simple Login
          </h1>
          <div className="flex flex-col gap-2 items-start justify-between p-2">
            <div className="flex items-center justify-start gap-1 ">
              <Image
                className="w-[22px] h-[17px]"
                alt="arrow svg"
                src="/svgs/arrow.svg"
                width={22}
                height={17}
              />
              <div className=" text-zinc-400 text-[17px] font-medium">
                Find Your Starting Point, Craft Your Perfect Resume
              </div>
            </div>
            <div className="flex items-center justify-start gap-1 ">
              <Image
                className="w-[22px] h-[17px]"
                alt="arrow svg"
                src="/svgs/arrow.svg"
                width={22}
                height={17}
              />
              <div className=" text-zinc-400 text-[17px] font-medium">
                Master the Art of Resume Writing with Best Practices
              </div>
            </div>
            <div className="flex items-center justify-start gap-1 ">
              <Image
                className="w-[22px] h-[17px]"
                alt="arrow svg"
                src="/svgs/arrow.svg"
                width={22}
                height={17}
              />
              <div className=" text-zinc-400 text-[17px] font-medium">
                Unlock Success with Mentor-Recommended Templates
              </div>
            </div>
            <div className="flex items-center justify-start gap-1 ">
              <Image
                className="w-[22px] h-[17px]"
                alt="arrow svg"
                src="/svgs/arrow.svg"
                width={22}
                height={17}
              />
              <div className=" text-zinc-400 text-[17px] font-medium">
                Get Noticed by HR - Make Your Resume Irresistible
              </div>
            </div>
            <div className="flex items-center justify-start gap-1 ">
              <Image
                className="w-[22px] h-[17px]"
                alt="arrow svg"
                src="/svgs/arrow.svg"
                width={22}
                height={17}
              />
              <div className=" text-zinc-400 text-[17px] font-medium">
                Rise Above the Rest - Stand Out from Your Peers
              </div>
            </div>
          </div>
        </div>
        {/* button */}
        <Link
          href={editorLink}
          className="flex justify-center md:justify-start "
        >
          <div className="text-center text-neutral-200 md::text-[2.3rem] text-xl font-medium p-4 px-16 rounded-lg bg-gradient-to-r from-blue-600 to-fuchsia-500 border-stone-500 w-fit">
            Build Your Resume
          </div>
        </Link>
      </div>

      {/* images  */}
      <div className="relative w-[26em] h-[30em] xl:scale-[1.1] lg:scale-[.9] md:scale-[.9] scale-[.65] translate-x-4 md:-translate-x-4   lg:-translate-x-2 xl:-translate-x-14 ">
        <Suspense>
          <Image
            alt="example resume"
            className="absolute rounded right-[0] top-[50%] -translate-y-1/2 scale-[1] brightness-[.95]  object-cover aspect-[17/22]"
            src="/exampleR/twoColumn.webp"
            loading="lazy"
            width={900}
            height={1500}
            blurDataURL="/exampleR/twoColumn.webp"
            placeholder="blur"
          />
        </Suspense>

        <Suspense>
          <Image
            alt="example resume"
            className="absolute rounded right-[28%] top-[55%] -translate-y-1/2 scale-120 h-[28rem] w-[22rem] brightness-[.97] shadow-lg"
            src="/exampleR/singleColumn.webp"
            loading="lazy"
            width={900}
            height={1500}
            blurDataURL="/exampleR/singleColumn.webp"
            placeholder="blur"
          />
        </Suspense>
      </div>
    </section>
  );
}

export default HeroSection;
