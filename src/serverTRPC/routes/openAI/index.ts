// pathname: api/trpc/pdf/{functionNameHere}
import { prisma } from "@/lib/prisma";
import { privateProcedure, router } from "@/serverTRPC/trpc";
import { Inputs } from "@/types/builder";
import { PdfToSchema } from "@/utils/openai.util";
import { AtsExtraction, makeOpenAiRequest } from "@/utils/util";
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
            throw new Error("resume entry not found");
        }
        if (resumeData?.paymentStatus !== 'paid') {
            throw new Error("payment not done");
        }

        // extract only the good part of the whole json resume and try to get some recommendations on to improve it and get a over all ats score

        if (resumeData) {
            // here we got the data now need to get the text of the pdf 
            // use the extracted text from the resume and use that get ats score and recommendations
            console.log("requesting openai here");


            // abstract this function to make openai request
            const messages = [
                {
                    role: 'user',
                    content: `
                        you are a skilled resume selector base on the basis of  data extraction model, you never make things up 
                        1. text is info extracted from a pdf resume 
                        2. if the exact requested information is not present in the text then you can leave it empty.
                        3. extract all this information - ${[AtsExtraction].map(i => i.function.name).join(', ')} from the text
                        4. do not make things up, do not pharaphrase, do not add any extra information, do not remove any information  
                        5. remember you need to extract all the information from the text, so be sure to extract all the information user asked from you, and be strict about the format of the information

                        json : ${resumeData.data}
                        `.trim(),
                },
            ];

            var results = makeOpenAiRequest(messages);
            console.log("openai response", results);


            resumeData.data 




            return {
                atsScore: 5, recommandations: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sapiente mollitia, repellat deleniti eos sed dignissimos cumque, cum, incidunt libero asperiores explicabo iusto doloremque autem adipisci in.Nobis, obcaecati sapiente."
            }
        } else {
            console.log("response error");
            throw new Error("resume entry not found");
            // return { status: 'error' }
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
