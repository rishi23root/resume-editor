import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="w-full sm:fcb  ">
      <Link href={"/"}>
        <Image
          alt="logo"
          className="w-full h-20 lg:w-96 lg:h-20"
          src="/logo.png"
          width={350}
          height={80}
        />
      </Link>
      <div className="flex flex-col lg:w-[60%] w-full gap-2 h-full py-2 ">
        <Link
          href={"https://buildyourresume.online/privacyPolicy"}
          className="text-base font-medium text-center sm:text-right  text-white "
        >
          Privacy Policy
        </Link>
        <Link
          href={"https://buildyourresume.online/termAndCondition"}
          className="text-base font-medium text-center sm:text-right  text-white "
        >
          Terms & Conditions
        </Link>
        <Link
          href={"mailto:contact@buildyourresume.online"}
          className="text-base font-medium text-center sm:text-right  text-white "
        >
          contact@buildyourresume.online
        </Link>
        <div className="w-full h-px border border-white"></div>
      </div>
    </footer>
  );
}

export default Footer;
