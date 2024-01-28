// handle most of the data extraction using prisma
import { createCanvas, Image } from 'canvas'

import { templateWithImages } from "@/types/templates";

export async function getTemplateDataWithImages() {
  const res = await fetch(`${process.env.BACKEND}/templates`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  // loop through the names and get images data for each images
  let data: string[] = await res.json();

  // loop through the names and get images data for each
  const templatesWithImages: templateWithImages[] = await Promise.all(
    data.map(async (element, index) => {
      // const images = await fetch();
      const res = await fetch(
        `${process.env.BACKEND}/getTemplatePreview?templateName=${element}`
      );

      return {
        id: index,
        name: element,
        pages: res.ok ? await res.json() : [],
      };
    })
  );

  return templatesWithImages;
}

export async function compressImage(image: string, quality: number = 0.3) {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image()
      img.src = image
      const canvas = createCanvas(img.width, img.height)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      return resolve(canvas.toDataURL('image/jpeg', quality) as string)
    } catch (error) {
      // reject(error as string)
    }
  })
}
