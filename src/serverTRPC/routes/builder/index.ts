// pathname: api/trpc/pdf/{functionNameHere}
import { defaultTemplate } from "@/JSONapiData/builder";
import { procedure, router } from "@/serverTRPC/trpc";
import { Inputs } from "@/types/builder";
import { z } from "zod";

export const builderRouter = router({
  getDefault: procedure.query(() => {
        // load the json file and remove all elements
        const data = defaultTemplate as Inputs
        // data.work[0].name = "Your Name"
        return data ;
    }),
});