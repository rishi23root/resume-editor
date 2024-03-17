import { ScaleOnHover } from "@/components/custom/animateWrap";
import { Illustration } from "@/components/pageSpecific/blog";
import { cn } from "@/lib/utils";
import { getAllBlogMeta } from "@/utils/mdx";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Build.Your.Resume - Blog",
  description:
    "Read more on templates and guidance for crafting resumes tailored to fresher job seekers. Discover the optimal fresher resume formats, templates, and essential ATS insights to land your dream job.",
  keywords: [
    "summary for resume for freshers",
    "how to make resume for freshers",
    "what is ats resume",
    "ats resume checker",
    "fast job",
    "job card",
    "mgnrega job card",
    "student first job resume format for freshers",
    "resume for freshers",
    "fresher resume",
    "fresher resume format",
    "fresher resume template",
    "fresher resume templates",
    "fresher resume sample",
  ],
};

// test for payment page here once then del it for good
export default async function BlogHome() {
  const posts = await getAllBlogMeta();

  return (
    <div className="fc gap-2 p-4 flex-1">
      <h1 className="text-5xl font-extrabold mb-4 lg:mb-12 text-center">
        Blogs
      </h1>
      <div
        className={cn(
          "grid grid-flow-row-dense grid-cols-1 lg:grid-cols-2",
          "gap-4 justify-center self-center w-full",
          "lg:m-4 lg:px-20"
        )}
      >
        {posts?.map((post) => (
          <Link href={`blog/${post.slug}`} key={post?.title}>
            <ScaleOnHover>
              <div className="p-8 rounded-md shadow-md hover:shadow-xl glass w-full h-80 transition-all duration-150 ease-linear relative z-20 overflow-hidden group fc justify-between">
                <div>
                  <h3 className="text-xl xl:text-2xl font-semibold">
                    {post.title}
                  </h3>
                  <div className="brightness-75">{post.description}</div>
                </div>
                <div className="opacity-85">
                  <p className="mt-4 text-sm font-bold">{post.author}</p>
                  <time className="text-sm">{post.date}</time>
                </div>
                <div className="absolute bottom-0 left-0 w-full opacity-60">
                  <Illustration mouseEnter={false} />
                </div>

                <div
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-1 bg-blue-400 z-10 blur-sm rounded-b-md",
                    "group-[:not(:hover)]:animate-pulse group-hover:h-12 group-hover:bg-blue-200/30 group-hover:-translate-y-[14em]",
                    "transition-transform duration-150 delay-150 ease-in-out"
                  )}
                />
              </div>
            </ScaleOnHover>
          </Link>
        ))}
      </div>
    </div>
  );
}
