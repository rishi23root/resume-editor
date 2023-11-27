// pathname: api/trpc/jobDis/{functionNameHere}
import { procedure, router } from "@/serverTRPC/trpc";
import { z } from "zod";

import { JobDiscriptionData } from '@/JSONapiData/jobDescriptionData/';
import { keyValue } from "@/types/utils";
import { templateArrayTypes } from "@/types/jobDescription";

export const jobDescriptionRouter = router({
    all: procedure.query(() => {
        // console.log('request for all job titles');
        
        if (!JobDiscriptionData){
            return {} as keyValue<string>;
        }
        const jobTitles = Object.entries(JobDiscriptionData).reduce<keyValue<string>>((result, [key,val]) => {
            result[key] = val.title 
            return result;
        }, {});
        return jobTitles;
    }),
    byId: procedure
        .input(
            z.object({
                jobId: z.number(),
            })
        )
        .query((opts) => {
            if (!JobDiscriptionData){
                return {} as templateArrayTypes[] ;
            }
            const jobId = opts.input.jobId;
            if (JobDiscriptionData.hasOwnProperty(jobId)){
                const dataForId = JobDiscriptionData[jobId].templates ;
                return dataForId;
            }
            return {} as templateArrayTypes[];
        })
});
    
// z.object({
//     jobId: z.number(),
// }).nullish(),