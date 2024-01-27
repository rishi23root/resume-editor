import Link from "next/link";
import React from "react";

export function SectionAbout({ editorLink }: { editorLink: string }) {
  return (
    <section id="about" className=" min-h-[65vh] fc fce w-full fcc fc gap-8 ">
      {/* heading */}
      <div className="w-full gap-4 text-center fcc fc">
        <div className="text-5xl font-bold text-neutral-200">About Us</div>
        <div className="text-base font-medium text-zinc-400 text-opacity-40">
          #ForTheStudentsByTheStudents
        </div>
      </div>
      {/* inner text para */}
      <div className="text-lg font-medium text-zinc-300 text-opacity-70 max-w-[75ch]">
        We are a team of experienced professionals, both students and working
        professionals, who are passionate about helping people succeed in their
        careers. We believe that everyone deserves to have access to
        high-quality services that will help them stand out from the competition
        and land their dream job.
        <br />
        <br />
        That’s why we created this project, to provide a platform where people
        can find the services they need, when they need them.
        <br />
        <br />
        We offer a wide range of services, including resume writing, cover
        letter writing, applications for foreign universities, interview
        coaching, and career mentoring. We are committed to providing our
        clients with the best possible service, and we use the latest technology
        to ensure that our services are delivered in a timely and efficient
        manner. We also offer a satisfaction guarantee, so you can be sure that
        you are getting the best possible value for your money.
        <br />
        <br />
        We believe that everyone deserves to have a great career, and we are
        here to help you achieve your goals. Contact us today at
        <Link
          href={"mailto:contact@buildyourresume.online"}
          className="hover:text-zinc-200"
        >
          {" "}
          contact@buildyourresume.online{" "}
        </Link>
        to learn more about how we can help you succeed.
        <br />
        <br />
        Whether you are a student, an individual looking for career assistance,
        or a company that needs these services in bulk, we can help.
      </div>
    </section>
  );
}
