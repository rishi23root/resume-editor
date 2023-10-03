"use client";
import Image from "next/image";

const ExtractLinkedinProfile = () => {
  function handleLinkedInProfileExtraction() {
    console.log("element clicked");
    // convert this function to server function that will be responsible to extracting data from the linkedin and redirect the user to the new page 
  }
  return (
    <div
      className="min-w-[24.5rem] h-64 overflow-hidden duration-75 shadow-2xl cursor-pointer rounded-xl glass hover:scale-105 bg-linkedin"
      onClick={handleLinkedInProfileExtraction}
    >
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
  );
};

export default ExtractLinkedinProfile;
