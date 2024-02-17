import { emptyTemplate } from "@/JSONapiData/refTemplate";
import { custom_functions } from './util';
import https from "https";
import _ from "lodash";

export class PdfToSchema {
    text: string;
    model: string;
    returnDict: any;
    constructor(text: string, model = "gpt-3.5-turbo-0125") {
        this.text = text;
        this.model = model;
        this.returnDict = Object.assign({}, emptyTemplate); // Assuming data.json is in the same directory
    }

    async formatResponse(aiKey: string, predictedValue: any) {
        // console.log(this.returnDict);
        console.log("working on :", aiKey);

        // task of the function is to update the returnDict with the predicted values
        // if the key is common in the returnDict then update the value
        // if the key is not present in the returnDict then continue

        if (typeof predictedValue !== 'object' || typeof predictedValue === 'number' || (Array.isArray(predictedValue) && typeof predictedValue[0] !== 'object')) {
            console.log('predicted value is not an object or list, must be accuracy bleeding')
            console.log(aiKey, predictedValue);

            return
        } else if (Array.isArray(predictedValue) && typeof predictedValue[0] === 'object') {
            console.log('predicted value is a list of object')
            // loop predicted data and save the updates in the returnDict
            // make a copy of the list fist element
            var temp = Object.assign({}, this.returnDict[aiKey][0]);
            this.returnDict[aiKey] = predictedValue.map((value: any, index: number) => {
                let returnEle = {};
                for (const [subkey, subvalue] of Object.entries(temp)) {
                    // if the key is not present in the returnDict then continue
                    if (typeof subvalue === 'string') {
                        returnEle[subkey] = value[subkey] || '';
                    } else if (typeof subvalue === 'boolean') {
                        returnEle[subkey] = eval(value[subkey]) || false;
                    }
                }
                console.log(returnEle);

                return returnEle
            })
        } else {
            console.log('predicted value is a dict')
            // the only possible case is the predicted key is basic
            for (const [key, value] of Object.entries(this.returnDict[aiKey])) {
                if (key in predictedValue) {
                    if (typeof value === 'string') {
                        this.returnDict[aiKey][key] = predictedValue[key] || '';
                    } else if (Array.isArray(value)) {
                        // loop throught the list and update the values
                        var temp = Object.assign({}, this.returnDict[aiKey][key][0]);
                        this.returnDict[aiKey][key] = value.map((valueR: any, index: number) => {
                            let returnEle = {};
                            for (const [subkey, subvalue] of Object.entries(temp)) {
                                // if the key is not present in the returnDict then continue
                                if (typeof subvalue === 'string') {
                                    returnEle[subkey] = valueR[subkey] || '';
                                } else if (typeof subvalue === 'boolean') {
                                    returnEle[subkey] = eval(valueR[subkey]) || false;
                                }
                            }
                            console.log(returnEle);

                            return returnEle
                        })

                    } else if (typeof value === 'object') {
                        // loop throught the dict and update the values
                        var temp = Object.assign({}, this.returnDict[aiKey][key]);
                        for (const [subkey, subvalue] of Object.entries(temp)) {
                            // if the key is not present in the returnDict then continue
                            if (typeof subvalue === 'string') {
                                this.returnDict[aiKey][key][subkey] = predictedValue[key][subkey] || '';
                            }
                        }
                    }

                }
            }
        }

        // ----
        // const temp = { ...this.returnDict[aiKey][0] };

        // if (Array.isArray(predictedValue)) {
        //     // handelList(aiKey, predictedValue);
        //     var key = aiKey;
        //     var value = predictedValue;
        //     console.log('dict', key);

        //     // if id is not present or 
        //     // project has summary in place of description
        //     for (let index = 0; index < value.length; index++) {
        //         // console.log(value);
        //         if (typeof value[0] === 'string') {
        //             console.log(`value error, must be accuracy bleeding: ${key}`);
        //             // this.returnDict[key][index] = i;
        //             continue;
        //         }
        //         if (!value[index].hasOwnProperty('id')) {
        //             console.log(`unable @@ : ${key}.${index}.id`);
        //             value[index]['id'] = `${index + 1}`;
        //         }
        //         if (value[index].hasOwnProperty('summary') && aiKey === 'projects') {
        //             console.log(`updated : ${key}.${index}.description`);
        //             value[index]['description'] = value[index]['summary'];
        //             delete value[index]['summary'];
        //         }
        //         if (value[index].hasOwnProperty('title2') && aiKey === 'awards') {
        //             console.log(`updated : ${key}.${index}.description`);
        //             value[index]['title'] = value[index]['title2'];
        //             delete value[index]['title2'];
        //         }
        //     }

        //     // make a copy to use before hand

        //     for (let index = 0; index < value.length; index++) {
        //         // console.log(value);
        //         if (typeof value[0] === 'string') {
        //             console.log(`value error, must be accuracy bleeding: ${key}`);
        //             // this.returnDict[key][index] = i;
        //             continue;
        //         }
        //         // console.log('[new] -', i);
        //         for (const [subkey, subvalue] of Object.entries(value[index])) {
        //             if (!(subkey in temp)) {
        //                 console.log(`unable @@ : ${key}.${index}.${subkey}`);
        //                 // this.returnDict[aiKey][key][subkey] = "";
        //             } else {
        //                 if (this.returnDict[key].length < index + 1) {
        //                     this.returnDict[key].push({ ...temp });
        //                 }
        //                 console.log(`updated : ${key}.${index}.${subkey}`);
        //                 this.returnDict[key][index][subkey] = subvalue;
        //             }
        //         }
        //     }
        // } else {
        //     for (const [key, value] of Object.entries(predictedValue)) {
        //         // console.log(key, value);
        //         if (key in this.returnDict[aiKey]) {
        //             if (typeof value === 'object') {
        //                 console.log('dict', key);
        //                 for (const [subkey, subvalue] of Object.entries(value as any)) {
        //                     if (!(subkey in this.returnDict[aiKey][key])) {
        //                         console.log(`unable @@ : ${aiKey}.${key}.${subkey}`);
        //                         this.returnDict[aiKey][key][subkey] = "";
        //                     } else {
        //                         console.log(`updated : ${aiKey}.${key}.${subkey}`);
        //                         this.returnDict[aiKey][key][subkey] = subvalue;
        //                     }
        //                 }
        //             } else if (Array.isArray(value)) {
        //                 console.log('list', key);
        //                 for (let index = 0; index < value.length; index++) {
        //                     for (const [subkey, subvalue] of Object.entries(value[index])) {
        //                         if (!(subkey in this.returnDict[aiKey][key][0])) {
        //                             console.log(`unable @@ : ${aiKey}.${key}.${index}.${subkey}`);
        //                             this.returnDict[aiKey][key][index][subkey] = "";
        //                         } else {
        //                             console.log(`updated : ${aiKey}.${key}.${index}.${subkey}`);
        //                             if (this.returnDict[aiKey][key].length < index + 1) {
        //                                 this.returnDict[aiKey][key].push({ ...this.returnDict[aiKey][key][0] });
        //                             }
        //                             this.returnDict[aiKey][key][index][subkey] = subvalue;
        //                         }
        //                     }
        //                 }
        //             } else if (typeof value === 'string') {
        //                 // console.log('str', key);
        //                 if (key in this.returnDict[aiKey]) {
        //                     console.log(`updated : ${aiKey}.${key}`);
        //                     this.returnDict[aiKey][key] = value;
        //                 } else {
        //                     console.log(`unable @@ : ${aiKey}.${key}`);
        //                     this.returnDict[aiKey][key] = "";
        //                 }
        //             }
        //         } else {
        //             console.log(`updated : ${aiKey}.${key}`);
        //             this.returnDict[aiKey][key] = value;
        //         }
        //     }
        // }
        // Sample log statement
        console.log(`Updated: ${aiKey}`);
    }

    async sendRequest(tools: typeof custom_functions) {
        const messages = [
            {
                role: 'user',
                content: `
          you are a skilled data extraction model, you never make things up 
          1. text is info extracted from a pdf resume 
          2. if the exact requested information is not present in the text then you can leave it empty.
          3. extract all this information - ${[...custom_functions].reverse().map(i => i.function.name).join(', ')} from the text
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
        console.log('used token :', response.usage.total_tokens);

        if (response?.choices) {
            this.returnDict
        }

        // if there are tool used in the response
        const toolCalls = response.choices[0].message.tool_calls;

        if (toolCalls) {
            // console.log(toolCalls);
            for (const toolCall of toolCalls) {
                const functionArgs = JSON.parse(toolCall.function.arguments);
                const functionName = toolCall.function.name;

                if ('dataArray' in functionArgs) {
                    this.formatResponse(functionName, functionArgs['dataArray']);
                } else {
                    this.formatResponse(functionName, functionArgs);
                }
            }
        }
    }

    async extractSchema() {
        // make 2 functions at once to get better results
        await Promise.all(
            [
                this.sendRequest([custom_functions[0], custom_functions[1], custom_functions[2]]),
                this.sendRequest([custom_functions[3], custom_functions[4]])
            ]);

        // console.log(this.returnDict);
        return this.returnDict;
    }
}

// Sample usage

// const text = "data here";
// const call = new PdfToSchema(text);
// const results = await call.extractSchema();
// console.log(results['awards']);
