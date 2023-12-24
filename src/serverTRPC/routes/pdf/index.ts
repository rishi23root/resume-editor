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
    ).query((opts) => {
        // take the file and and extract information from it

        // make eh openai request here
        // opts.input.pdf 
        return {
            tesing: "success",
        };
    }),
});