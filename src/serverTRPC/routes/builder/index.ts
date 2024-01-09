// pathname: api/trpc/pdf/{functionNameHere}
import { defaultTemplate } from "@/JSONapiData/builder";
import { prisma } from "@/lib/prisma";
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
  // function to update or get the data form a specific resume id
  getDataByResumeId: procedure.input(
    z.object({
      id: z.string(),
      userId: z.string(),
    })
  ).query(async (opts) => {
    // check if this id is valid
    const resumeData = await prisma.resumeData.findUnique({
      where: {
        id: opts.input.id,
        userId: opts.input.userId,
      },
      select: {
        data: true,
      }
    })
    if (resumeData) {
      // console.log('resume data found');

      return JSON.parse(resumeData.data) as Inputs
    }
    throw new Error("resume data not found");
  }),
  // updateDataByResumeId: procedure.input(
  //   z.object({
  //     id: z.string(),
  //     userId: z.string(),
  //   })
  // ).query(async (opts) => {
  //   // check if this id is valid
  //   const resumeData = await prisma.resumeData.findUnique({
  //     where: {
  //       id: opts.input.id,
  //       userId: opts.input.userId,
  //     },
  //     select: {}
  //   })
  //   if (resumeData) {
  //     // console.log('resume data found');
  //     return { status: 'success' }
  //     // return JSON.parse(resumeData.data) as Inputs
  //   } else{
  //     return { status: 'success' }
  //   }
  //   throw new Error("resume data not found");
  // })
});


