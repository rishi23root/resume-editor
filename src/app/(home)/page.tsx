import Nav from "../../components/Nav";
import Line from "../../components/Line";
import HeroSection from "../../components/Sections/HeroSection";
import Section2 from "../../components/Sections/Section2";
import SectionFeatures from "../../components/Sections/SectionFeatures";
import { SectionAbout } from "../../components/Sections/SectionAbout";
import { SectionPrice } from "../../components/Sections/SectionPrice";
import Footer from "../../components/Footer";
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
