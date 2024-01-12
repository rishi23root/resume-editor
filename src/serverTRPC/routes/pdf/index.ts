// pathname: api/trpc/pdf/{functionNameHere}
import { schema } from "@/components/pageSpecific/builder/schema";
import { procedure, router } from "@/serverTRPC/trpc";
import { z } from "zod";

export const pdfRouter = router({
    parse: procedure.input(
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
                jsonData: { 'data': data }
            };
        } catch (err) {
            return {
                error: "unable to convert text into schema format :(",
                jsonData: { 'data': 'data' }
            };
        }
    }),
});