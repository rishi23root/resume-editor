import { blogPostMeta } from "@/types/blog";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { LinkPreview } from "./components/LinkPreview";
import { customImage } from "./components/customImage";

const components = {
  img: customImage,
  a: LinkPreview,
};

const rootDirectory = path.join(process.cwd(), "src", "blogData");

export const getBlogBySlug = async (slug: string) => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`);

  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true },
    components: components,
  });

  return { meta: { ...frontmatter, slug: realSlug } as blogPostMeta, content };
};

export const getAllBlogMeta = async () => {
  const files = fs.readdirSync(rootDirectory);

  // let posts: any= []
  let posts: blogPostMeta[] = [];

  for (const file of files) {
    const { meta } = await getBlogBySlug(file);
    posts.push(meta);
  }

  return posts;
};
