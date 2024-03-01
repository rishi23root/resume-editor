import https from "https";
import _ from "lodash";
import { AtsAndRecommendationExtraction, modelUsable } from "./openai/util";


const tools = [AtsAndRecommendationExtraction];

async function makeOpenAiRequest(text: string) {
    console.log('[info] making openai request');
    const messages = [
        {
            role: 'user',
            content: `
                you are a skilled resume analyst, on the basis of these checks
                - Highlights of Qualifications: Matching skills to the target job description .
                - Experience: Listing in reverse chronological order with specific details .
                - Accomplishments: Specific, measurable, and quantifiable achievements .
                - Rapid/Frequent Promotions: Noteworthy career progression .
                - Awards and Recognition: Employee of the Month, President's Club, etc. .
                - Tangible Evidence of Accomplishments: Publications, products developed, software applications created .
                - Operational Efficiency Contributions: Cost reduction, time-saving, improved processes .
                - Productivity Contributions: Team motivation, increased efficiency .
                - Relationship Building: Internal and external stakeholder engagement .
                - Problem-Solving Skills: Using SAR or PAR technique to showcase problem-solving abilities .
                - statistics: use numbers to quantify your achievements
                
                data in text : ${text}
                
                extract the ats score and recommendation 
                1. use bullet points to represent the recommendation
                2. and give to the point answers and be strict about the format of the information
                `.trim(),
            // note: if you think there is no update required then return "All good to go. Best of luck for the interview"
        },
    ];

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
                if (typeof functionArgs === "object" && 'atsScore' in functionArgs && 'recommendation' in functionArgs) {
                    return {
                        atsScore: functionArgs.atsScore,
                        recommendation: functionArgs.recommendation
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

const cache = {};

export async function cachedMakeOpenAiRequest(text: string, id: string) {
    if (cache[id]) {
        // console.log("returning from cache ", id);
        return await cache[id];
    } else {
        // console.log("calling expensiveFunction ", id);
        cache[id] = makeOpenAiRequest(text);
        const results = await cache[id];

        if (results?.recommendation?.startsWith("for some reason")) {
            delete cache[id];
            return results;
        }
        setTimeout(() => {
            delete cache[id];
        }, 1000 * 60); // 1min cache clear
        return results;
        ;
    }
}

async function makeOpenAiRequestforSummary(text: string, id: string) {
    const key = id.split(';')[0];
    console.log('[info] making openai request for description');
    const messages = [{
        role: 'user',
        content: `you are a world-class helper to write description for the resume section ${key}, where existing text is - '${text}' ,help user to write more professional, attractive and ATS friendly content in bulletins only, and try using statist and facts to make it more professional and attractive, you are completing the existing text therefore do not repeat the existing text.`
    }]

    // make request using fetch
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: modelUsable,
            messages,
        }),
    });
    const data = await response.json();

    // print token used
    console.log('used token :', data.usage.total_tokens);
    return text + "\n" + data.choices[0].message.content;
}

export function cachedMakeOpenAiRequestforSummary(text: string, id: string) {
    // console.log(id, text);

    if (cache[id]) return cache[id];

    // console.log("calling expensiveFunction ", id);
    const result = makeOpenAiRequestforSummary(text, id);
    cache[id] = result;
    setTimeout(() => {
        delete cache[id];
    }, 1000 * 30); // 30sec cache clear
    return result;
}
