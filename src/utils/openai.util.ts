import { emptyTemplate } from "@/JSONapiData/refTemplate";
import { AtsAndRecommendationExtraction, custom_functions } from './util';
import https from "https";
import _ from "lodash";
import { JsonType } from "@/types/utils";

const modelUsable = "gpt-3.5-turbo-0125";

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
            for await (const [index, element] of value.entries()) {
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

        const options = {
            hostname: 'api.openai.com',
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Replace with your OpenAI API key
            },
        };

        const response = await new Promise((resolve, reject) => {
            const req = https.request(options, (res: any) => {
                let data = '';

                res.on('data', (chunk: any) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });

            req.on('error', (error: any) => {
                reject(error);
            });

            req.write(requestData);
            req.end();
        }) as any;

        if (response.error) {
            console.log(response.error)
            return
        }

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
    }

    async extractSchema() {
        // make 2 functions at once to get better results
        const tokens = await Promise.all(
            [
                this.sendRequest([custom_functions[0], custom_functions[1], custom_functions[2]]),
                this.sendRequest([custom_functions[3], custom_functions[4]])
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



const tools = [AtsAndRecommendationExtraction];

export async function makeOpenAiRequest(messages: any[], id: string) {
    const requestData = JSON.stringify({
        model: modelUsable,
        messages: messages,
        tools: tools,
        tool_choice: 'auto',
    });

    const options = {
        hostname: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Replace with your OpenAI API key
        },
    };

    // create a cahe for the openai request using key as id for 30 seconds
    // if the same id is requested within 30 seconds then return the same result




    const response = await new Promise((resolve, reject) => {
        const req = https.request(options, (res: any) => {
            let data = '';

            res.on('data', (chunk: any) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        });

        req.on('error', (error: any) => {
            reject(error);
        });

        req.write(requestData);
        req.end();
    }) as any;

    if (response.error) {
        console.log(response.error)
        return
    }

    // print token used
    console.log('used token :', response.usage.total_tokens);

    // if there are tool used in the response
    const toolCalls = response.choices[0].message.tool_calls;

    if (toolCalls) {
        // console.log(toolCalls);
        for await (const toolCall of toolCalls) {
            const functionArgs = JSON.parse(toolCall.function.arguments);
            const functionName = toolCall.function.name;
            console.log(functionName, functionArgs);
            if (functionName === "ats_and_recommendation") {
                if (typeof functionArgs === "object" && 'atsScore' in functionArgs) {
                    return {
                        atsScore: functionArgs.atsScore,
                        recommendation: functionArgs.recommendation || "All good to go. Best of luck for the interview"
                    }
                } else {
                    return {
                        atsScore: 0,
                        recommendation: "for some reason we are unable to get the ats score and recommendation, please try again later"
                    }
                }
            }
        }
    }
    return {
        atsScore: 0,
        recommendation: "for some reason we are unable to get the ats score and recommendation, please try again later"
    }

}

