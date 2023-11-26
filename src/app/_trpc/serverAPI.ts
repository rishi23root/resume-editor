import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server";
import { base_url } from "./util";

export const serverAPI = appRouter.createCaller({
  links: [
    httpBatchLink({
      url:`${base_url}/api/trpc`,
    }),
  ],
});
