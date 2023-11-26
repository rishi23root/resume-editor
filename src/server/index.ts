
// import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { router, procedure } from "./trpc";

export const appRouter = router({
    hello: procedure
        .query(() => {
            return "ligit hello"
        }),
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
});

export type AppRouter = typeof appRouter;