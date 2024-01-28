import usePriceJson from "@/hooks/PriceJson";
import { cn } from "@/lib/utils";
import { priceDataType } from "@/types/payment";
import { ClassValue } from "clsx";
import Link from "next/link";
import React from "react";

export async function SectionPrice() {
  const data = await usePriceJson();
  return (
    <section id="pricing" className=" min-h-[65vh] fc fce w-full gap-12">
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
      <div className="flex-wrap w-full h-full gap-8 fr fcc">
        <EachCard data={data[0]} />
        <EachCard
          data={data[1]}
          className="bg-black/10 w-88 gap-12"
          buttonStyle={
            "w-72 p-2 border bg-gradient-to-r from-blue-600 to-fuchsia-500 rounded-2xl border-stone-500 fcc"
          }
          isRecommended={true}
        />
        <EachCard data={data[2]} />
      </div>
    </section>
  );
}

function EachCard({
  data,
  className,
  buttonStyle,
  isRecommended,
}: {
  data: priceDataType;
  className?: ClassValue;
  buttonStyle?: ClassValue;
  isRecommended?: boolean;
}) {
  return (
    <div
      className={cn(
        "p-6 gap-2 bg-[#252835] glass fcb fc w-72 rounded-3xl relative",
        className
      )}
    >
      {isRecommended && (
        <div className="absolute px-2 top-0 left-1/2 -translate-y-1 translate-x-2 font-bold text-md rounded-b-lg  bg-gradient-to-r from-blue-600 to-fuchsia-500 shadow-md shadow-zinc-900">
          Recommended
        </div>
      )}
      <div className="gap-6 fss fc  w-full">
        <div className="flex flex-col items-start justify-center gap-1 ">
          <div className="flex flex-col items-start justify-center gap-1">
            <div className="text-base font-medium text-center text-neutral-200">
              {data.title}
            </div>
            <div className="text-4xl font-semibold text-center text-neutral-200">
              {data.price}
            </div>
          </div>
          <div className="text-sm font-medium text-zinc-400">
            {data.description}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-2">
          <div className="text-sm font-semibold text-zinc-100">
            What&lsquo;s incuded:
          </div>
          <div className="w-full h-48 gap-3 text-sm font-medium fss fc text-zinc-400 text-opacity-80">
            {data.features.map((val, index) => {
              return <span key={index}>{val}</span>;
            })}
          </div>
        </div>
      </div>
      <Link
        href={data.link}
        className={cn(
          "w-full p-2 border rounded-2xl border-stone-500 fcc",
          buttonStyle
        )}
      >
        <div className="text-xl font-medium text-white/90">Get started</div>
      </Link>
    </div>
  );
}
