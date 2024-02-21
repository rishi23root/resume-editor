import { Github, Linkedin, Twitter } from "lucide-react";
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
          href={"/privacyPolicy"}
          className="text-base font-medium text-center sm:text-right  text-white "
        >
          Privacy Policy
        </Link>
        <Link
          href={"/termAndCondition"}
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
        <div className="w-full h-px border border-white" />
        <div className="fr gap-4 justify-center h-[2.5rem]">
          <Link
            href={"https://twitter.com/rishi23jain"}
            className="text-base font-medium text-center sm:text-right text-white p-2 group hover:glass hover:p-2 hover:rounded-sm "
          >
            <Twitter
              strokeWidth={1}
              className="group-hover:scale-125 transition-transform duration-250 ease-in-out"
            />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/rishi23jain/"}
            className="text-base font-medium text-center sm:text-right text-white p-2 group hover:glass hover:p-2 hover:rounded-sm "
          >
            <Linkedin
              strokeWidth={1}
              className="group-hover:scale-125 transition-transform duration-250 ease-in-out"
            />
          </Link>
          <Link
            href={"https://github.com/rishi23root/"}
            className="text-base font-medium text-center sm:text-right text-white p-2 group hover:glass hover:p-2 hover:rounded-sm "
          >
            <Github
              strokeWidth={1}
              className="group-hover:scale-125 transition-transform duration-250 ease-in-out"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
