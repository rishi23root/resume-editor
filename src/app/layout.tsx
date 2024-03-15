import NoSSR from "@/hooks/NoSSR";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { clsx } from "clsx";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import type { Viewport } from "next";
const BubbleUnderlay = dynamic(
  () => import("@/components/custom/BubbelUnderLay")
);

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata: Metadata = {
  title: "Build.Your.Resume online",
  description:
    "Build your standout resume effortlessly with our 100% free LaTeX resume templates. Streamline your job application process and make your candidacy shine brighter and get more interviews in 2024 and get hired",
  // "build your resume online, select the perfect 100% accepting templates, personalize it, and get more interviews in 2024 and get hired, in Maggi time.",
  keywords: [
    "build.your.resume",
    "build your resume",
    "resume",
    "resume formatting",
    "resume maker",
    "overleaf resume",
    "cv curriculum vitae",
    "cover letter examples",
    "resume builder",
    "resume templates",
    "resume examples",
    "build a resume",
    "professional resume",
    "resume help",
    "job search",
    "internship search",
    "resume services",
    "resume writing professional",
    "best resume building",
    "Ats resume",
    "build my resume",
    "resume writing help",
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
  },
  metadataBase: new URL("https://buildyourresume.online"),
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
            poppins.className,
            "bg-[#12141D]",
            "text-white/80",
            "min-h-screen",
            "min-w-full ",
            "relative ",
            "fc "
          )}
        >
          <SpeedInsights />
          <Analytics />

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
