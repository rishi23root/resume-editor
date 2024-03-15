import { getAllBlogMeta } from '@/utils/mdx';
import { MetadataRoute } from 'next'
import { format, parse } from 'date-fns'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogMeta();
  // const isoDate = moment(inputDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
  const isoDate = (date: string) => format(parse(date, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd');
  const blogposts = posts.map((post) => ({
    url: `${process.env.FRONTEND}/blog/${post.slug}`,
    lastModified: isoDate(post.date),
    changeFrequency: 'weekly',
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
      url: `${process.env.FRONTEND}/Templates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${process.env.FRONTEND}/JobDescriptions`,
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