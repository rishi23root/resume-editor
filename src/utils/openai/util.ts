import { emptyTemplate } from "@/JSONapiData/refTemplate";
import { JsonType } from "@/types/utils";
import _ from "lodash";

export const modelUsable = "gpt-3.5-turbo-0125";

// open ai custom functions
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
            'description': 'user work information from the body of the text, which includes the work experience of the person in these variables only - id, name, position, url, startDate, isWorkingHere, endDate, summary, years, in array of objects ',
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
            'description': 'user education information from the body of the text,which includes the education of the person in these variables only - id ,institution ,url ,studyType ,area ,startDate ,isStudyingHere ,endDate ,score , in array of objects ',
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
            'description': 'user projects information from the body of the text,which includes the projects of the person in these variables only - id ,name ,url ,languages ,description , in array of objects ',
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
            'description': 'array object of awards information from body of the text, dataArray is array of objects {id,url,summary,awarder,date,title2}, if found else empty element',
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
                                "description": "a discription, if present in the text else empty, convert the normal text into bullet using html ui, li elements only"
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
                                'description': 'name of the award or certificate, as title if present in the text else empty'
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

export const AtsAndRecommendationExtraction = {
    "type": "function",
    "function": {
        'name': 'ats_and_recommendation',
        'description': 'Get the ats score and recomendation from the resume text',
        'parameters': {
            'type': 'object',
            'properties': {
                'atsScore': {
                    'type': 'number',
                    'description': 'ATS score of the content between 0 to 9'
                },
                'recommendation': {
                    'type': 'string',
                    'description': 'a brief recommendation, to make this resume stand out and get shortlisted for the interviews'
                }
            },
        },
        "required": ['atsScore', 'recommendation']
    },
}

// pdf to schema extraction
export class PdfToSchema {
    text: string;
    model: string;
    returnDict: any;
    constructor(text: string, model = modelUsable) {
        this.text = text;
        this.model = model;
        this.returnDict = Object.assign({}, emptyTemplate); // Assuming data.json is in the same directory
    }

    async formatResponse(parentData: JsonType, key: string, value: JsonType, verbose: boolean = false) {

        // some fixes for reserver keywords in openai function calling format
        if (key === 'awards') {
            for (const [index, element] of value.entries()) {
                if ('title2' in element) {
                    element['title'] = element['title2'];
                    delete element['title2'];
                }
            }
        }

        // console.log('format call for key:', key, typeof value ,", is instance of array:", Array.isArray(value));
        // console.log(_.keys(value));

        if (Array.isArray(value) && typeof value[0] === 'object') {
            verbose && console.log('[array] working on :', key);
            const returnArr: JsonType[] = []
            for await (const [index, element] of value.entries()) {
                const t = await this.formatResponse(Object.assign({}, parentData[0]), `${key}.${index}`, element) as JsonType;
                if ('id' in t) {
                    t['id'] = index + 1;
                }
                returnArr.push(t);
            }
            return returnArr;
        } else if (Array.isArray(value) && typeof value[0] === 'string') {
            // check if all values are strings
            if (value.every((v) => typeof v === 'string')) {
                verbose && console.log('[string array] working on :', key);
                return value;
            }
        } else if (typeof value === 'object' && typeof parentData === 'object') {
            verbose && console.log('[object] working on :', key);
            // loop throught the parentData and update the values
            for await (const [subkey, subvalue] of Object.entries(value)) {
                // if the key is not present in the returnDict then continue
                if (subkey in parentData) {
                    // verbose && console.log(subkey,Array.isArray(subvalue) && typeof subvalue[0] === 'object');
                    if (typeof subvalue === 'string') {
                        verbose && console.log("updated:", subkey);
                        parentData[subkey] = value[subkey] || '';
                    } else if (Array.isArray(subvalue)) {
                        parentData[subkey] = await this.formatResponse(parentData[subkey], subkey, subvalue);
                    } else if (typeof subvalue === 'object') {
                        verbose && console.log('sub object', subkey);
                        parentData[subkey] = await this.formatResponse(parentData[subkey], subkey, subvalue);
                    }
                } else {
                    verbose && console.log('key not present', key, subkey);
                }
            }
            return await parentData
        } else {
            verbose && console.log('returning:', key, " unable to process");
            return await parentData;
        }
    }

    async sendRequest(tools: typeof custom_functions) {
        const messages = [
            {
                role: 'user',
                content: `
                    you are a skilled data extraction model, you never make things up 
                    1. text is info extracted from a pdf resume 
                    2. if the exact requested information is not present in the text then you can leave it empty.
                    3. extract all this information - ${[...custom_functions].map(i => i.function.name).join(', ')} from the text
                    4. do not make things up, do not pharaphrase, do not add any extra information, do not remove any information  
                    5. remember you need to extract all the information from the text, so be sure to extract all the information user asked from you, and be strict about the format of the information

                    text: ${this.text}
                    `.trim(),
            },
        ];

        const requestData = JSON.stringify({
            model: this.model,
            messages: messages,
            tools: tools,
            tool_choice: 'auto',
        });


        const url = 'https://api.openai.com/v1/chat/completions';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Replace with your OpenAI API key
            },
            body: requestData
        };

        // const response = await new Promise((resolve, reject) => {
        //     const req = https.request(options, (res: any) => {
        //         let data = '';

        //         res.on('data', (chunk: any) => {
        //             data += chunk;
        //         });

        //         res.on('end', () => {
        //             resolve(JSON.parse(data));
        //         });
        //     });

        //     req.on('error', (error: any) => {
        //         reject(error);
        //     });

        //     req.write(requestData);
        //     req.end();
        // }) as any;

        try {
            const req = await fetch(url, options);
            const response = await req.json();
            // Handle the data as needed
            // console.log(response);


            // print token used
            // console.log('used token :', response.usage.total_tokens);

            // if there are tool used in the response
            const toolCalls = response.choices[0].message.tool_calls;

            if (toolCalls) {
                // console.log(toolCalls);
                for (const toolCall of toolCalls) {
                    const functionArgs = JSON.parse(toolCall.function.arguments);
                    const functionName = toolCall.function.name;

                    if ('dataArray' in functionArgs) {
                        this.returnDict[functionName] = await this.formatResponse(this.returnDict[functionName], functionName, functionArgs['dataArray']);
                    } else {
                        this.returnDict[functionName] = await this.formatResponse(this.returnDict[functionName], functionName, functionArgs);
                    }
                }
            }

            return response.usage.total_tokens;
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            return;
            // if (response.error) {
            //     console.log(response.error)
            //     return
            // }
        }
    }

    async extractSchema() {
        // make 2 functions at once to get better results
        const tokens = await Promise.all(
            [
                this.sendRequest([
                    custom_functions[0],
                    custom_functions[1],
                ]),
                this.sendRequest([
                    custom_functions[2],
                    custom_functions[3],
                    custom_functions[4]
                ]),
                // this.sendRequest([custom_functions[0]]),
                // this.sendRequest([custom_functions[1]]),
                // this.sendRequest([custom_functions[2]]),
                // this.sendRequest([custom_functions[3]]),
                // this.sendRequest([custom_functions[4]]),
            ]);

        console.log("[info] total token used :", _.sum(tokens))

        // console.log(this.returnDict);
        return this.returnDict;
    }
}

// Sample usage

// const text = "data here";
// const call = new PdfToSchema(text);
// const results = await call.extractSchema();
// console.log(results['awards']);


// ats and recommendation extraction
