// handle most of the data extraction using prisma

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

// import { PDFExtract } from "pdf.js-extract";

// const pdfExtract = new PDFExtract();
// const options = {};

// export function extractTextFromPDFbuffer(buffer: Buffer) {
//   return new Promise((resolve, reject) => {
//     pdfExtract.extractBuffer(buffer, {}, (err, data) => {
//       if (err) return reject(err);
//       const dataWithLinks = data?.pages
//         .map(page => {
//           return (
//             page.content
//               .map((content: { str: string; }) => content.str.trim().replace(/\s+/g, " "))
//               .filter((content: string) => content !== "")
//               .join(" ") + page.links.join(" ")
//           );
//         })
//         .join("\n");

//       // console.log(dataWithLinks);
//       return resolve(dataWithLinks);
//     });
//   });
// }


export async function readBlobAsBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(blob);
  });
}
