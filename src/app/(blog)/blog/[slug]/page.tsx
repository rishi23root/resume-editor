import { getBlogBySlug } from "@/utils/mdx";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";

const getPageContent = async (slug: string) => {
  const { meta, content } = await getBlogBySlug(slug);
  return { meta, content };
};

export async function generateMetadata({ params }) {
  const { meta } = await getPageContent(params.slug);
  return { title: meta.title, description: meta.description, date: meta.date };
}
// components: {
//       img: customImage,
//       a: LinkPreview,
//     },
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { meta, content } = await getPageContent(params.slug);

  return (
    <div className="flex-1 fc">
      {/* breadcrumbs */}
      <div className="mb-8 fr gap-4 cursor-pointer bg-gradient-to-r from-white/10  to-transparent p-1 px-2 rounded-md">
        <Link
          href={"/"}
          className="hover:underline decoration-blue-500 animate-in underline-offset-8 transition-all duration-300 ease-in-out"
        >
          <span className="text-md lg:text-xl">Home</span>
        </Link>
        <span className="opacity-70 texl-xl ">/</span>
        <Link
          href={"/blog"}
          className="hover:underline decoration-blue-500 animate-in underline-offset-8 transition-all duration-300 ease-in-out"
        >
          <span className="text-md lg:text-xl">Blog</span>
        </Link>
        <span className="opacity-70 texl-xl">/</span>
        <Link
          href={"/blog/" + meta.slug}
          className="underline decoration-blue-500 animate-in underline-offset-8 transition-all duration-300 ease-in-out"
        >
          <span className="text-md lg:text-xl">{meta.title}</span>
        </Link>
      </div>
      {/* actual blog data */}
      <section className="w-full lg:w-3/4 self-center flex-1 fc items-center">
        <h1 className="uppercase text-3xl lg:text-4xl text-center">
          {meta.title}
        </h1>
        <p className="opacity-70 text-sm m-2 mb-12">
          <span className="underline decoration-blue-500/40 underline-offset-4">
            {meta.author}
          </span>
          - {meta.date}
        </p>
        <div className="prose prose-invert  max-w-screen-2xl text-lg self-center text-justify  w-full ">
          {content}
          {/* <MDXRemote compiledSource={content} /> */}
          {/* <MDXProvider components={{ h2: Component3, h3: Component4 }}>
          </MDXProvider> */}
          {/* <Content /> */}
        </div>
      </section>
    </div>
  );
}
