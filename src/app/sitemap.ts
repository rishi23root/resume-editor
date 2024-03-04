import { getAllBlogMeta } from '@/utils/mdx';
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogMeta();
  const blogposts = posts.map((post) => ({
    url: `${process.env.FRONTEND}/blog/${post.slug}`,
    lastModified: new Date(post.date) as Date,
    changeFrequency: 'monthly',
    priority: 1,
  }));
  return [
    {
      url: `${process.env.FRONTEND}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${process.env.FRONTEND}/blog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${process.env.FRONTEND}/privacyPolicy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${process.env.FRONTEND}/termAndCondition`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...blogposts as any
  ]
}