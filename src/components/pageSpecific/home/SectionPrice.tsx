import Link from "next/link";
import React from "react";

export function SectionPrice({ editorLink }: { editorLink: string }) {
  return (
    <section id="pricing" className=" min-h-[65vh] fc fce w-full gap-2">
      {/* heading */}
      <div className="w-full gap-4 text-center fcc fc">
        <div className="text-3xl font-bold lg:text-5xl md:text-4xl text-neutral-200">
          Make the prudent and straightforward
          <br />
          decision for your career
        </div>
        <div className="text-base font-medium text-zinc-400 text-opacity-40">
          Choose from our affordable 3 packages made for students and Groups
        </div>
      </div>
      {/* tiles */}
      <div className="flex-wrap w-full h-full gap-8 py-8 fr fcc">
        <div className="p-6 bg-[#252835] glass fcb fc w-72 rounded-3xl">
          <div className="gap-6 fss fc w-52">
            <div className="flex flex-col items-start justify-center gap-1 ">
              <div className="flex flex-col items-start justify-center gap-1">
                <div className="text-base font-medium text-center text-neutral-200">
                  Basic Package
                </div>
                <div className="text-4xl font-semibold text-center text-neutral-200">
                  Rs. 10
                </div>
              </div>
              <div className="text-sm font-medium text-zinc-400">
                Essential Resume Package
              </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-2">
              <div className="text-sm font-semibold text-zinc-100">
                What&lsquo;s incuded:
              </div>
              <div className="w-full h-48 gap-3 text-sm font-medium fss fc text-zinc-400 text-opacity-80">
                <span>
                  Chose from Top Templates <br />
                  (limited)
                </span>
                <span>AI integration </span>
                <span>ATS integration</span>
                <span>Single click builder</span>
              </div>
            </div>
          </div>
          <Link
            href={editorLink}
            className="w-full p-2 border rounded-2xl border-stone-500 fcc"
          >
            <div className="text-xl font-medium text-white/90">Get started</div>
          </Link>
        </div>
        <div className="gap-4 p-6 bg-black/10 glass fcb fc min-w-80 rounded-3xl">
          <div className="gap-8 fss fc ">
            <div className="flex flex-col items-start justify-center gap-1 ">
              <div className="flex flex-col items-start justify-center gap-1">
                <div className="text-base font-medium text-center text-neutral-200">
                  Advanced Package
                </div>
                <div className="text-4xl font-semibold text-center text-neutral-200">
                  Rs. 50
                </div>
              </div>
              <div className="text-sm font-medium text-zinc-400">
                Enhanced Resume Package
              </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-2">
              <div className="text-sm font-semibold text-zinc-100">
                What&lsquo;s incuded:
              </div>
              <div className="w-full h-56 gap-3 text-sm font-medium fss fc text-zinc-400 text-opacity-80">
                <span>Everything in Basic plan</span>
                <span>No limit in Template Choice</span>
                <span>Mentor Review</span>
                <span>Create Resume according to Job Description</span>
              </div>
            </div>
          </div>
          <Link
            href={editorLink}
            className="w-full p-2 border bg-gradient-to-r from-blue-600 to-fuchsia-500 rounded-2xl border-stone-500 fcc "
          >
            <div className="text-xl font-medium text-white/90">Get started</div>
          </Link>
        </div>

        <div className="p-6 bg-[#252835] glass fcb fc w-72 rounded-3xl">
          <div className="gap-6 fss fc w-52">
            <div className="flex flex-col items-start justify-center gap-1 ">
              <div className="flex flex-col items-start justify-center gap-1">
                <div className="text-base font-medium text-center text-neutral-200">
                  Premium Package
                </div>
                <div className="text-4xl font-semibold text-center text-neutral-200">
                  Let&lsquo;s Talk
                </div>
              </div>
              <div className="text-sm font-medium text-zinc-400">
                Estimate Resume Package
              </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-2">
              <div className="text-sm font-semibold text-zinc-100">
                What&lsquo;s incuded:
              </div>
              <div className="w-full h-48 gap-3 text-sm font-medium fss fc text-zinc-400 text-opacity-80">
                <span>Mass building</span>
                <span>Everything in basic plan </span>
                <span>Everything in Advance plan</span>
                <span>Price discussion</span>
                <span>Updates According to need (organization logo, etc)</span>
              </div>
            </div>
          </div>
          <Link
            href={"mailto:contact@buildyourresume.online"}
            className="w-full p-2 border rounded-2xl border-stone-500 fcc"
          >
            <div className="text-xl font-medium text-white/90">Get started</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
