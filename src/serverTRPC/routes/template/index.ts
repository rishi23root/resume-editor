// pathname: api/trpc/jobDis/{functionNameHere}
import { JobDiscriptionData } from "@/JSONapiData/jobDescriptionData/";
import { procedure, router } from "@/serverTRPC/trpc";
import { jobDescriptionDataType } from "@/types/jobDescription";
import { keyValue } from "@/types/utils";
import * as fs from "node:fs";
import { z } from "zod";
// import {1,2,3,4} from '@/JSONapiData/exampleTemplates' assert {type: 'json'};

export const templateRouter = router({
  all: procedure.query(async () => {
    // get all templates as array of templates from backend

    const res = await fetch(process.env.BACKEND as string + '/templates')

    if (res.status == 200) {
      const templates = await res.json()
      return templates as string[]
    } else {
      throw new Error("request failed, 500")
    }
  })
});