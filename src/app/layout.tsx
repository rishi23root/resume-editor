import NoSSR from "@/hooks/NoSSR";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { clsx } from "clsx";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, Poppins, Exo_2 } from "next/font/google";
import localfont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
const BubbleUnderlay = dynamic(
  () => import("@/components/custom/BubbelUnderLay")
);

// const inter = Inter({ subsets: ["latin"] });
const inter = Poppins({ weight: "400", subsets: ["latin"] });
// const inter = Exo_2({ weight: "400", subsets: ["latin"] });
// const inter = localfont({
//   src: "./fonts/Surt-Normal-Bold.woff2",
//   variable: "--font-surt-bold",
//   weight: "400",
// });

export const metadata: Metadata = {
  title: "Build.Your.Resume online",
  description:
    "Generate a perfect resume online, select the 100% accepting templates , personalize it, and get more interviews in 2024, in Maggi time.",
  keywords: [
    "resume",
    "cover letter examples",
    "resume builder",
    "resume templates",
    "resume examples",
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
  icons: {
    icon: ["/favicon.ico?v=1"],
    apple: ["/logo.png?v=1"],
    shortcut: ["/logo.png?v=1"],
    // openGraph: ["/og.png?v=1"],
  },
  openGraph: {
    type: "website",
    title: "Build.Your.Resume",
    description:
      "Generated Your Resume online free, fast and easy with simple clicks.",
    url: "https://buildyourresume.online",
    siteName: "Build.Your.Resume",
    images: [
      {
        url: "https://buildyourresume.online/opengraph-image.jpg",
        alt: "Build.Your.Resume",
        width: 500,
        height: 160,
      },
    ],
  },
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
            "min-w-full ",
            "relative ",
            "fc "
          )}
        >
          <SpeedInsights />

          <NextTopLoader height={3} color="#3b82f6" />
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
          {/* <TwScreenInfo /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
