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
            <div className="p-8 rounded-md shadow-md hover:shadow-xl glass w-full lg:w-[25em] transition-all duration-150 ease-linear relative z-20 overflow-hidden group">
              <h3 className="text-xl xl:text-2xl font-semibold">
                {post.title}
              </h3>
              <div>{post.description}</div>
              <p className="mt-4 text-sm opacity-75">{post.author}</p>
              <time className="text-[12px] text-gray-400">{post.date}</time>
              <div
                className={cn(
                  "absolute bottom-0 left-0 w-full h-1 bg-blue-400 z-10 blur-sm rounded-b-md",
                  "group-[:not(:hover)]:animate-pulse group-hover:h-12 group-hover:bg-blue-200/30 group-hover:-translate-y-[14em]",
                  "transition-transform duration-150 delay-75 ease-in-out"
                )}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
