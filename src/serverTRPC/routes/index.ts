import { router } from "@/serverTRPC/trpc";
import { jobDescriptionRouter } from "./jobDescription";
import { pdfRouter } from "./pdf";
import { priceRouter } from "./payment";
import { builderRouter } from "./builder";

export const appRouter = router({
    jobDis: jobDescriptionRouter,
    price: priceRouter,
    builder: builderRouter,
    pdf: pdfRouter, // all pdf related routes
});

export type AppRouter = typeof appRouter;