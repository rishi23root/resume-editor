// pathname: api/trpc/pdf/{functionNameHere}
import { prisma } from "@/lib/prisma";
import { privateProcedure, router } from "@/serverTRPC/trpc";
import { Inputs } from "@/types/builder";
import { PdfToSchema, cachedMakeOpenAiRequest } from "@/utils/openai.util";
import { jsonToParagraphs } from "@/utils/util";
import { z } from "zod";

export const openAIRouter = router({
    // parse the pdf for and return the json data
    pdfTextToJson: privateProcedure.input(
        z.object({
            pdfText: z.any()
        }),
    ).mutation(async (opts) => {
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
            // use the extracted text from the resume and use that get ats score and recommendation
            var results = await cachedMakeOpenAiRequest(await jsonToParagraphs(JSON.parse(resumeData.data)), opts.input.resumeId);
            // console.log("openai response", results);
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