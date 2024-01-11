// pathname: api/trpc/pdf/{functionNameHere}
import { procedure, router } from "@/serverTRPC/trpc";
import { z } from "zod";
import { pdfFileSchema } from "./util";

export const pdfRouter = router({
    parse: procedure.input(
        z.object({
            pdf: pdfFileSchema
            // pdf: pdfFileSchema
        }),
    ).query(async (opts) => {
        // take the file and and extract information from it


        // ############ to do
        // complete the pdf.parse route

        // make openai request here
        try {
            // opts.input.pdf 
            // if error return error
            console.log(opts.input.pdf);
            return {
                jsonData: { 'data': 'data' }
            };
        } catch (err) {
            return {
                error: "unable to parse pdf file, implement this route",
                jsonData: { 'data': 'data' }
            };
        }


        // return {
        //     jsonData: 'data'
        // }
    }),
});