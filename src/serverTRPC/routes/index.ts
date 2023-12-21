
// import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { router, procedure } from "@/serverTRPC/trpc";
import { jobDescriptionRouter } from "./jobDescription";
import { priceRouter } from "./payment";

export const appRouter = router({
    hello2: procedure
        .input(
            z.object({
                text: z.string(),
            }),
        )
        .query((opts) => {
            return {
                greeting: `hello ${opts.input.text}`,
            };
        }),
    jobDis: jobDescriptionRouter,
    price: priceRouter,

});

export type AppRouter = typeof appRouter;