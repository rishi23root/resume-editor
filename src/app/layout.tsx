import "@/styles/globals.css";
import { clsx } from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const BubbleUnderlay = dynamic(
  () => import("@/components/custom/BubbelUnderLay")
);

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import NoSSR from "@/hooks/NoSSR";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Build.Your.Resume",
  description:
    "Generated Your Resume online free, fast and easy with simple clicks.",
  keywords: [
    "build.your.resume",
    "build a resume",
    "making a resume",
    "make a resume",
    "create resume",
    "resume writing",
    "professional resume",
    "resume help",
    "job resume",
    "resume services",
    "service resume",
    "resume top",
    "resume writing professional",
    "best resume",
    "best resume building",
    "its resume",
    "basic resume",
    "build a professional resume",
    "build my resume",
    "resume building services",
    "resume writing help",
    "resume easy",
    "resume assistance",
    "make professional resume",
    "help building a resume",
    "build a resume easy",
    "how to make resume",
    "where to make resume",
    "which resume to make",
  ],
  authors: [
    { name: "rishi23root" },
    { name: "Rishabh Jain", url: "https://github.com/rishi23root" },
  ],
  // openGraph: {
  //   type: "website",
  //   url: "https://editor.buildyourresume.online",
  //   title: "Build.Your.Resume",
  //   description:
  //     "Generated Your Resume online free, fast and easy with simple clicks.",
  //   images: [
  //     {
  //       url: "https://buildyourresume.online/logo.png",
  //       alt: "Build.Your.Resume",
  //     },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          suppressHydrationWarning={true}
          className={clsx(
            inter.className,
            "bg-[#12141D]",
            "text-[#E0E0E0]",
            "min-h-screen",
            "min-w-full pb-8",
            "relative ",
            "fc "
          )}
        >
          {/* bg animations */}
          <Suspense>
            <NoSSR>
              <BubbleUnderlay
                className={cn(
                  "fixed",
                  "top-0 left-0",
                  "w-full h-full",
                  "-z-10",
                  "pointer-events-none",
                  "select-none"
                )}
              />
            </NoSSR>
          </Suspense>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
