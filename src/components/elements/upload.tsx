import Image from "next/image";
import React from "react";

type Props = {};


// todo:
// make a full page drop box for this componet and upload data 
// and parse it on client side and send parsed data to the server or other way around have to look into it 


const UploadResume = (props: Props) => {
  return (
    <div className="min-w-[24.5rem] h-64 overflow-hidden duration-75 shadow-2xl cursor-pointer rounded-xl noisebg glass hover:scale-105 border-dashed border-4 text-center">
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
  );
};

export default UploadResume;
