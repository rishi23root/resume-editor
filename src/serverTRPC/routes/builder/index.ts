// pathname: api/trpc/pdf/{functionNameHere}
import { defaultTemplate } from "@/JSONapiData/builder";
import { makeEmptyObject } from "@/lib/utils";
// import { serverAPI } from "@/serverTRPC/serverAPI";
import { procedure, router } from "@/serverTRPC/trpc";
import { Inputs } from "@/types/builder";
import { getUserData } from "@/utils/dbUtils";
import { z } from "zod";

export const builderRouter = router({
  getDefault: procedure.input(
    z.object({
      jobId: z.number(),
    })
  ).query(async (opts) => {
    // load the json file and remove all elements
    var data = defaultTemplate as Inputs

    let mask = data.mask;
    let skillMask = data.skills.mask;
    // remove all data from the data object
    data = makeEmptyObject(data);
    data = { ...data, mask, skills: { ...data.skills, mask: skillMask } };

    // append default values
    const userInfo = await getUserData(opts.input.jobId);
    data.basics.name = userInfo.name
    data.basics.email = userInfo.email
    data.basics.label = userInfo.label;

    return data;
  }),
});


