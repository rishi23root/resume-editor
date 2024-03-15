// pathname: api/trpc/pdf/{functionNameHere}
import prisma from "@/lib/prisma";
import { privateProcedure, router } from "@/serverTRPC/trpc";
import { cachedMakeOpenAiRequest, cachedMakeOpenAiRequestforSummary } from "@/utils/openai.util";
import { jsonToParagraphs } from "@/utils/util";
import { z } from "zod";

export const openAIRouter = router({
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
    }),

    // take pdf text and give ats recomandations
    getCompletion: privateProcedure.input(
        z.object({
            currentText: z.string(),
            keyName: z.string(),
        })
    ).mutation(async (opts) => {
        const text = opts.input.currentText;
        const keyName = opts.input.keyName + ';' + opts.ctx.id
        // make openai request here
        try {
            // convert data to json using open ai api function calling
            const results = await cachedMakeOpenAiRequestforSummary(text, keyName);
            return results as string;
        } catch (err) {
            throw new Error("unable to build the text here :(");
        }
    })
});