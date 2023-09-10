import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="w-full fcb ">
      <Image
        alt="logo"
        className="w-20 h-10 lg:w-96 lg:h-20"
        src="/logo.png"
        width={350}
        height={80}
      />
      <div className="flex flex-col items-end justify-end lg:w-[60%] w-full gap-2 h-full py-2 ">
        <Link
          href={"mailto:contact@buildyourresume.online"}
          className="text-base font-medium text-right text-white "
        >
          contact@buildyourresume.online
        </Link>
        <div className="w-full h-px border border-white"></div>
      </div>
    </footer>
  );
}

export default Footer;
