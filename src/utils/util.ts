// handle most of the data extraction using prisma
// import { createCanvas, Image } from 'canvas'
import sharp from 'sharp'
import { templateWithImages } from "@/types/templates";
import { JsonType } from '@/types/utils';
import https from 'https';

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

export async function compressImage(image: string, quality: number = 0.3): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const newimage = image.split(';base64,').pop()
    const buffer = Buffer.from(newimage as string, 'base64');
    console.log("compressing image");

    await sharp(buffer)
      .jpeg({ quality: quality * 10 })
      .toBuffer()
      .then(data => {
        resolve(`data:image/png;base64,${data.toString('base64')}`)
      })
      .catch(reject)
  })
}

export function flattenJson(json: JsonType, parentKey = "") {
  let result: JsonType = {};

  for (const key in json) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof json[key] === "object" && !Array.isArray(json[key])) {
      // Recursively flatten nested objects
      result = { ...result, ...flattenJson(json[key], newKey) };
    } else if (Array.isArray(json[key])) {
      // Flatten arrays by appending index to keys
      json[key].forEach((item: JsonType, index: any) => {
        const arrayKey = `${newKey}.${index}`;
        if (typeof item === "object") {
          result = { ...result, ...flattenJson(item, arrayKey) };
        } else {
          result[arrayKey] = item;
        }
      });
    } else {
      result[newKey] = json[key];
    }
  }

  return result;
}

export function makeOpenAiRequest() {
  // abstract this function to make openai request

}





export const custom_functions = [
  // basics
  {
    "type": "function",
    "function": {
      'name': 'basics',
      'description': 'Get the basic information from the body of the input text',
      'parameters': {
        'type': 'object',
        'properties': {
          'name': {
            'type': 'string',
            'description': 'Name of the person'
          },
          'label': {
            'type': 'string',
            'description': 'Job title of the person'
          },
          'email': {
            'type': 'string',
            'description': 'Email of the person'
          },
          'phone': {
            'type': 'string',
            'description': 'Phone number of the person'
          },
          "url": {
            "type": "string",
            "description": "URL of the person personal website or portfolio"
          },
          "summary": {
            "type": "string",
            "description": "a discription, if present in the text else empty,  convert the normal text into bullet using html ui, li elements only , if present in the text else empty,"
          },
          'location': {
            'type': 'object',
            'properties': {
              'address': {
                'type': 'string',
                'description': 'pinpoint address of the person present in the text else empty'
              },
              'postalCode': {
                'type': 'string',
                'description': 'postal code of the address if present in the text else empty'
              },
              'city': {
                'type': 'string',
                'description': 'current city of the address if present in the text else empty'
              },
              'countryCode': {
                'type': 'string',
                'description': 'current country code of the address if present in the text else empty'
              },
              'region': {
                'type': 'string',
                'description': 'region of the address if present in the text else empty'
              },
            },
            "required": ['address', 'postalCode', 'city', 'countryCode', 'region']
          },
          'profiles': {
            'type': 'array',
            'items': {
              'type': 'object',
              'properties': {
                'network': {
                  'type': 'string',
                  'description': 'social network name of the person present in the text else empty'
                },
                'username': {
                  'type': 'string',
                  'description': 'username of the person present in the text else empty'
                },
                'url': {
                  'type': 'string',
                  'description': 'URL of the person social network profile present in the text else empty'
                }
              },
              "required": ['network', 'username', 'url']
            }
          }
        },
        "required": ['name', 'label', 'email', 'phone', 'url', 'summary', 'location', 'profiles']
      }
    }
  },
  // work
  {
    "type": "function",
    "function": {
      'name': 'work',
      'description': 'Get the work information from the body of the input text,which includes the work experience of the person in these variables only - id, name, position, url, startDate, isWorkingHere, endDate, summary, years',
      'parameters': {
        'type': 'object',
        'properties': {
          "dataArray": {
            "type": "array",
            "items": {
              'id': {
                'type': 'string',
                'description': 'auto generat id for the work experience '
              },
              'name': {
                'type': 'string',
                'description': 'Name of the company'
              },
              'position': {
                'type': 'string',
                'description': 'position of the person in the company'
              },
              'url': {
                'type': 'string',
                'description': 'URL of the company website, if present in the text else empty'
              },
              "startDate": {
                "type": "string",
                "description": "start date of the work experience in the company, if present in the text else empty"
              },
              "isWorkingHere": {
                "type": "boolean",
                "description": "if the person is currently working in the company, calculated from the endDate, else false"
              },
              "endDate": {
                "type": "string",
                "description": "end date of the work experience in the company, if present in the text else empty"
              },
              'summary': {
                'type': 'string',
                'description': 'summary of the work experience, convert the normal text into bullet using html ui, li elements only , if present in the text else empty,'
              },
              'years': {
                'type': 'string',
                'description': 'years of experience in the company, if present in the text else empty'
              }
            },
            "required": ['id', 'name', 'position', 'url', 'startDate', 'isWorkingHere', 'endDate', 'summary', 'years']
          },
        },
        "required": ['dataArray']
      }
    }
  },
  // education
  {
    "type": "function",
    "function": {
      'name': 'education',
      'description': 'Get the education information from the body of the input text,which includes the education of the person in these variables only - id ,institution ,url ,studyType ,area ,startDate ,isStudyingHere ,endDate ,score ',
      'parameters': {
        'type': 'object',
        'properties': {
          "dataArray": {
            "type": "array",
            "items": {
              'id': {
                'type': 'string',
                'description': 'auto generat id for the education experience '
              },
              'institution': {
                'type': 'string',
                'description': 'Name of the institution'
              },
              'url': {
                'type': 'string',
                'description': 'URL of the institution website, if present in the text else empty'
              },
              'studyType': {
                'type': 'string',
                'description': 'studyType of the person in the institution'
              },
              'area': {
                'type': 'string',
                'description': 'area of education of the person in the institution, if present in the text else empty'
              },
              "startDate": {
                "type": "string",
                "description": "start date of the education, if present in the text else empty"
              },
              "isStudyingHere": {
                "type": "boolean",
                "description": "if the person is currently studying in the institution, calculated from the endDate, else false"
              },
              "endDate": {
                "type": "string",
                "description": "end date of the education, if present in the text else empty"
              },
              'score': {
                'type': 'string',
                'description': 'score obtained from this education, if present in the text else empty'
              }
            },
            "required": ["id", "institution", "url", "studyType", "area", "startDate", "isStudyingHere", "endDate", "score"
            ]
          },
        },
        "required": ['dataArray']
      }
    }
  },
  // projects
  {
    "type": "function",
    "function": {
      'name': 'projects',
      'description': 'Get the projects information from the body of the input text,which includes the projects of the person in these variables only - id ,name ,url ,languages ,description ',
      'parameters': {
        'type': 'object',
        'properties': {
          "dataArray": {
            "type": "array",
            "items": {
              'id': {
                'type': 'string',
                'description': 'auto generat id for the project '
              },
              'name': {
                'type': 'string',
                'description': 'Name of the project, if present in the text else empty'
              },
              'url': {
                'type': 'string',
                'description': 'URL of the project website, if present in the text else empty'
              },
              'languages': {
                'type': 'string',
                'description': 'languages, comma seperated, used in the project, if present in the text else empty'
              },
              "summary": {
                "type": "string",
                "description": "a discription, if present in the text else empty,  convert the normal text into bullet using html ui, li elements only , if present in the text else empty,"
              },
            },
            "required": ["id", "name", "url", "languages", "summary"]
          },
        },
        "required": ['dataArray']
      }
    }
  },
  // awards
  {
    "type": "function",
    "function": {
      'name': 'awards',
      'description': 'Get the awards / certificate / achivement information from body of the text, from the body of the input text, which includes the achivement of the person these variables only - title2, date, awarder, summary, url, id - if not present in the text then empty',
      'parameters': {
        'type': 'object',
        'properties': {
          "dataArray": {
            "type": "array",
            "items": {
              'id': {
                'type': 'string',
                'description': 'auto generat id for the awards'
              },
              'url': {
                'type': 'string',
                'description': 'URL of the award link, if present in the text else empty'
              },
              "summary": {
                "type": "string",
                "description": "a discription, if present in the text else empty, convert the normal text into bullet using html ui, li elements only , if present in the text else empty,"
              },
              'awarder': {
                'type': 'string',
                'description': 'Name of the award provider a person or organization, if present in the text else empty'
              },
              'date': {
                'type': 'string',
                'description': 'date of recieving the award, if present in the text else empty'
              },
              'title2': {
                'type': 'string',
                'description': 'name of the award or certificate, if present in the text else empty'
              }
            },
            "required": [
              "id",
              "url",
              "summary",
              "awarder",
              "date",
              "title2"
            ]
          },
        },
        "required": ['dataArray']
      }
    }
  }
]


// // print([i['function']['name'] for i in custom_functions])