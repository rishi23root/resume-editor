// pathname: api/trpc/pdf/{functionNameHere}
import { schema } from "@/components/pageSpecific/builder/schema";
import { procedure, router } from "@/serverTRPC/trpc";
import { Inputs } from "@/types/builder";
import { z } from "zod";

export const openAIRouter = router({
    // parse the pdf for and return the json data
    pdfTextToJson: procedure.input(
        z.object({
            pdfText: z.any()
            // pdf: pdfFileSchema
        }),
    ).query(async (opts) => {
        const text = opts.input.pdfText;

        // make openai request here
        try {
            // convert data to json using open ai api function calling
            let data = text
            schema.parse(data);
            return {
                jsonData: data as Inputs,
                error: ""
            };
        } catch (err) {
            return {
                error: "unable to convert text into schema format :(",
                jsonData: {} as Inputs
            };
        }
    }),

    // take pdf text and give ats recomandations

});