// 'use server'
// export const runtime = 'edge';
// export const runtime

import { templateWithImages } from "@/types/templates";
import { JsonType } from '@/types/utils';
import _ from 'lodash';
import { Readable } from "stream";
// import sharp from 'sharp';


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

// export async function compressImage(image: string, quality: number = 0.3): Promise<string> {
//   return new Promise(async (resolve, reject) => {
//     const newimage = image.split(';base64,').pop()
//     const buffer = Buffer.from(newimage as string, 'base64');
//     console.log("compressing image ", image.slice(0, 30));

//     try {
//       const files = await imagemin.buffer(buffer, {
//         plugins: [
//           imageminPngquant({
//             quality: [0.2, quality]
//           })
//         ]
//       });

//       resolve(`data:image/png;base64,${files.toString('base64')}`)
//     }
//     catch (err) {
//       console.log(err);
//       reject(err);
//     }


// await sharp(buffer)
//   .jpeg({ quality: quality * 10 })
//   .toBuffer()
//   .then(data => {
//     resolve(`data:image/png;base64,${data.toString('base64')}`)
//   })
//   .catch(reject)
//   })
// }

// export async function flattenJson(json: JsonType, parentKey = "") {
//   let result: JsonType = {};

//   for (const key in json) {
//     const newKey = parentKey ? `${parentKey}.${key}` : key;

//     if (typeof json[key] === "object" && !Array.isArray(json[key])) {
//       // Recursively flatten nested objects
//       result = { ...result, ...(flattenJson(json[key], newKey)) };
//     } else if (Array.isArray(json[key])) {
//       // Flatten arrays by appending index to keys
//       json[key].forEach((item: JsonType, index: any) => {
//         const arrayKey = `${newKey}.${index}`;
//         if (typeof item === "object") {
//           result = { ...result, ...(flattenJson(item, arrayKey)) };
//         } else {
//           result[arrayKey] = item;
//         }
//       });
//     } else {
//       result[newKey] = json[key];
//     }
//   }

//   return result;
// }

export async function jsonToParagraphs(jsonData: JsonType) {
  const processNestedObject = (obj: JsonType) => {
    let result = '';

    _.map(obj, (value, key) => {
      if (_.isObject(value)) {
        result += '\n' + processNestedObject(value);
      } else {
        result += `${value} `;
      }
    });

    return result;
  };

  var paragraphs = processNestedObject(jsonData);
  paragraphs = paragraphs.replace(/\n/g, ', ');
  // paragraphs = paragraphs.replace(/\n\n/g, '\t');

  return paragraphs;
}



export function streamTillPromise(cb: Promise<any>) {
  var isResolved = false;
  const results = cb.then((data: any) => {
    isResolved = true;
    console.log('[resolved]');
    return data;
  }).catch((err: any) => {
    isResolved = true;
    console.log('[rejected]');
    return err;
  })
  const encoder = new TextEncoder();


  return new ReadableStream({
    start(controller) {
      const timer = setInterval(async () => {
        if (isResolved) {
          var res: any;
          try {
            res = (await results);
            if (typeof res === 'object') {
              res = JSON.stringify(res);
            }
            controller.enqueue(encoder.encode(res));
          } catch (err) {
            controller.enqueue(encoder.encode('error: ' + err));
          } finally {
            controller.close();
            clearInterval(timer);

          }
        } else {
          controller.enqueue(encoder.encode('0'));
        }
      }, 500);

    },

  });
} 
