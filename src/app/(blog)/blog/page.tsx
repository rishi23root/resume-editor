import { ScaleOnHover } from "@/components/custom/animateWrap";
import { cn } from "@/lib/utils";
import { getAllBlogMeta } from "@/utils/mdx";
import Link from "next/link";

// test for payment page here once then del it for good
export default async function BlogHome() {
  const posts = await getAllBlogMeta();

  return (
    <div className="fc gap-2 p-4 flex-1">
      <h1 className="text-5xl font-extrabold mb-4 lg:mb-12 text-center">
        Blogs
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:m-4 justify-center self-center">
        {posts?.map((post) => (
          <Link href={`blog/${post.slug}`} key={post?.title}>
            <ScaleOnHover>
              <div className="p-8 rounded-md shadow-md hover:shadow-xl glass w-full h-full lg:w-[25em] transition-all duration-150 ease-linear relative z-20 overflow-hidden group fc justify-between">
                <div>
                  <h3 className="text-xl xl:text-2xl font-semibold">
                    {post.title}
                  </h3>
                  <div className="brightness-75">{post.description}</div>
                </div>
                <div className="opacity-85">
                  <p className="mt-4 text-sm ">{post.author}</p>
                  <time className="text-sm">{post.date}</time>
                </div>
                <div
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-1 bg-blue-400 z-10 blur-sm rounded-b-md",
                    "group-[:not(:hover)]:animate-pulse group-hover:h-12 group-hover:bg-blue-200/30 group-hover:-translate-y-[14em]",
                    "transition-transform duration-150 delay-75 ease-in-out"
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
