import { router } from "@/serverTRPC/trpc";
import { jobDescriptionRouter } from "./jobDescription";
import { openAIRouter } from "./openAI";
import { priceRouter } from "./payment";
import { builderRouter } from "./builder";
import { templateRouter } from "./template";

export const appRouter = router({
    templates: templateRouter,
    jobDis: jobDescriptionRouter,
    price: priceRouter,
    builder: builderRouter,
    openai: openAIRouter, // all openAi related routes
});

export type AppRouter = typeof appRouter;