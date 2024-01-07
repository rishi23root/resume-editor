// pathname: api/trpc/pdf/{functionNameHere}
import { defaultTemplate } from "@/JSONapiData/builder";
import { makeEmptyObject } from "@/lib/utils";
import { serverAPI } from "@/serverTRPC/serverAPI";
import { procedure, router } from "@/serverTRPC/trpc";
import { Inputs } from "@/types/builder";
import { currentUser, useUser } from "@clerk/nextjs";
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
        const  user  = await currentUser();
        if (user) {
          data.basics.name = user.firstName as string + " " + user.lastName as string
          let primaryAddress = user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress
          data.basics.email = primaryAddress ? primaryAddress as string : ""
        }
        const jobId = opts.input.jobId;
          // add all the data needed here
        const jobLabel = await serverAPI.jobDis.getNameById({ jobId});
        data.basics.label = jobLabel;

        return data ;
    }),
});


