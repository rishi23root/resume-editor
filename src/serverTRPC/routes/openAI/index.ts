// pathname: api/trpc/pdf/{functionNameHere}
import { prisma } from "@/lib/prisma";
import { privateProcedure, router } from "@/serverTRPC/trpc";
import { Inputs } from "@/types/builder";
import { PdfToSchema, makeOpenAiRequest } from "@/utils/openai.util";
import { AtsAndRecommendationExtraction, jsonToParagraphs } from "@/utils/util";
import { z } from "zod";

export const openAIRouter = router({
    // parse the pdf for and return the json data
    pdfTextToJson: privateProcedure.input(
        z.object({
            pdfText: z.any()
        }),
    ).query(async (opts) => {
        const text = opts.input.pdfText;

        console.log("[info] Analysing Text");
        // make openai request here
        try {
            // convert data to json using open ai api function calling
            // const text = "data here";
            const call = new PdfToSchema(text);
            const results = await call.extractSchema();
            console.log("[info] Analysing Done");

            return {
                jsonData: results as Inputs,
                error: ""
            };
        } catch (err) {
            console.log(err);
            return {
                error: "unable to extract text from the format :(, we are redirecting you to the manual form.",
                jsonData: {}
            };
        }
    }),

    // take pdf text and give ats recomandations
    getAtsAndRecommandation: privateProcedure.input(
        z.object({
            resumeId: z.string(),
        })
    ).mutation(async (opts) => {
        // need to check if the id is valid and user id is valid
        // check validity and update
        const resumeData = await prisma.resumeData.findUnique({
            where: {
                id: opts.input.resumeId,
                userId: opts.ctx.dbId as string,
                // paymentStatus: 'paid',
            },
            select: {
                id: true,
                data: true,
                paymentStatus: true
            }
        })

        if (!resumeData) {
            return {
                atsScore: "resume entry not found", recommendation: "[error] resume not found"
            }
        }
        if (resumeData?.paymentStatus !== 'paid') {
            return {
                atsScore: "Un-Paid :(", recommendation: "please complete the payment to use this feature"
            }
        }

        // extract only the good part of the whole json resume and try to get some recommendation on to improve it and get a over all ats score

        if (resumeData) {
            // here we got the data now need to get the text of the pdf 
            // use the extracted text from the resume and use that get ats score and recommendation

            // abstract this function to make openai request
            const messages = [
                {
                    role: 'user',
                    content: `
                        you are a skilled resume selector base on the basis of data extraction model, you will carefully read all the information present and give your honest views on what is wrong and what should be updated 
                        1. text is provided to you to relate the information  
                        2. extract the ats score and recommendation from the JSON data
                        3. be specific and explecit in your recommendation

                        text : ${jsonToParagraphs(JSON.parse(resumeData.data))}
                        `.trim(),
                },
            ];


            var results = await makeOpenAiRequest(messages, opts.input.resumeId);
            console.log("openai response", results);
            // console.log("openai response");
            // : { score: number, recommendation: string }
            return {
                atsScore: `${results?.atsScore}`,
                recommendation: results?.recommendation as string
            }
        } else {
            console.log("response error");
            return {
                atsScore: "0",
                recommendation: 'anable to get the ats score and recommendation, please try again later.'
            }
        }
    })
});


// 2. getAtsAndRecommandation 
// a. takes json data of resume
// b. returns ats score on the basis of recommendation

// ai discriptions 
// you are an expert in resume evaluating, when ever you are given a pdf text you will carefully read all the information present and give your honest view what is wrong and what should be updated and also provide to update location with it and remember do not make things up be specific and to the point 

// new

// you are an expert in text data labeling,
// 
//  and filling the most relevant information in the schema provided, 
// - you will carefully read all the information present 
// - leave fields blank which are not certain or relevant from the text provided 
// - fill the schema with the most relevant information 
// - remember do not make things 
