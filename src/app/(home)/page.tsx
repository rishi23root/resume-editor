import Nav from "../../components/Nav";

import dynamic from "next/dynamic";

const Line = dynamic(() => import("@/components/Line"));
const HeroSection = dynamic(() => import("@/components/Sections/HeroSection"));
const Section2 = dynamic(() => import("@/components/Sections/Section2"));
const SectionFeatures = dynamic(
  () => import("@/components/Sections/SectionFeatures")
);
const Footer = dynamic(() => import("@/components/Footer"));

import { SectionAbout } from "../../components/Sections/SectionAbout";
import { SectionPrice } from "../../components/Sections/SectionPrice";

import { BubbleUnderlay } from "@/components/custom/BubbelUnderLay";
import NoSSR from "@/hooks/NoSSR";
import clsx from "clsx";

// import TwScreenInfo from "@/components/custom/TwScreenInfo";

export default function Home() {
  const editorLink = "/dashboard";

  return (
    // make whole page with 10/12 width and center it on above medium screens
    <>
      <NoSSR>
        <BubbleUnderlay
          className={clsx(
            "fixed",
            "top-0 left-0",
            "w-full h-full",
            "-z-10",
            "pointer-events-none",
            "select-none"
          )}
        />
      </NoSSR>
      <main className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] flex flex-col lg:gap-20 gap-8 ">
        {/* paint each section */}
        <Nav />
        <HeroSection editorLink={editorLink} />
        <Line />
        <Section2 editorLink={editorLink} />
        <Line />
        <SectionFeatures editorLink={editorLink} />
        <Line />
        <SectionAbout editorLink={editorLink} />
        <Line />
        <SectionPrice editorLink={editorLink} />
        <Line />
        <Footer />

        {/* <TwScreenInfo /> */}
      </main>
    </>
  );
}
