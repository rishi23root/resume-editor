"use client";
import { Loadingstate } from "@/components/Fallbacks";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { AnchorHTMLAttributes, useEffect, useState } from "react";
import { motion } from "framer-motion";
const isYouTubeURL = (url: string) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};
export const LinkPreview = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { href: url } = props;
  const [previewData, setPreviewData] = useState<{
    title?: string;
    description?: string;
    image?: string;
    videoId?: string;
    videoThumbnail?: string;
  }>({
    title: "",
    description: "",
    image: "",
    videoId: "",
    videoThumbnail: "",
  });

  const [isYt, setIsYt] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/link-preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("[data]", data);

        setPreviewData(data);
        setLoading(false);
      });
    isYouTubeURL(url as string) && setIsYt(true);
  }, [url]);

  if (loading) {
    return (
      <>
        <span className="w-full fcc h-40 glass">
          <Loadingstate />
        </span>
        <br />
      </>
    );
  }

  if (!previewData) {
    return <span>Failed to fetch link preview. - {url}</span>;
  }

  if (previewData.videoId && previewData.videoThumbnail) {
    return (
      <Link href={url as string} target="_blank">
        <AspectRatio ratio={16 / 9}>
          <iframe
            className="rounded-xl w-full h-full"
            src={`https://www.youtube.com/embed/${previewData.videoId}`}
          ></iframe>
        </AspectRatio>
        <br />
      </Link>
    );
  }

  return (
    <motion.span
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="w-full fcc hover:bg-gradient-to-r from-blue-600 to-fuchsia-500 rounded-xl my-2 hover:p-[2px] transition-all duration-300 ease-in-out group cursor-alias"
    >
      <Link
        href={url as string}
        target="_blank"
        className="glass flex-1 flex flex-col lg:flex-row gap-4 h-auto no-underline p-3 group:hover:p-2  shadow-xl group-hover:bg-[#12141D] "
      >
        {previewData.image && (
          <span className="w-full lg:w-1/3  fcc ">
            <Image
              width={400}
              height={400}
              className="rounded-xl m-0 max-h-28 object-contain"
              src={previewData.image}
              alt="Link Preview"
            />
          </span>
        )}
        <span className="text-left justify-center my-auto ">
          <h3 className="m-0 text-lg">{previewData.title}</h3>
          <span className="text-md opacity-75">{previewData.description}</span>
        </span>
      </Link>
    </motion.span>
  );
};
