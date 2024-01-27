// pathname: api/trpc/jobDis/{functionNameHere}
import { JobDiscriptionData } from "@/JSONapiData/jobDescriptionData/";
import { procedure, router } from "@/serverTRPC/trpc";
import { jobDescriptionDataType } from "@/types/jobDescription";
import { keyValue } from "@/types/utils";
import * as fs from "node:fs";
import { z } from "zod";
// import {1,2,3,4} from '@/JSONapiData/exampleTemplates' assert {type: 'json'};

export const jobDescriptionRouter = router({
  all: procedure.query(() => {
    // console.log('request for all job titles');

    if (!JobDiscriptionData) {
      return {} as keyValue<string>;
    }
    const jobTitles = Object.entries(JobDiscriptionData).reduce<
      keyValue<string>
    >((result, [key, val]) => {
      result[key] = val.title;
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
    .query(async (opts) => {
      if (!JobDiscriptionData) {
        return {} as jobDescriptionDataType;
      }

      const jobId = opts.input.jobId;

      if (JobDiscriptionData.hasOwnProperty(jobId)) {
        const data = JobDiscriptionData[jobId] as jobDescriptionDataType;
        data.image = {} as keyValue<string>;
        // const images = {} as keyValue<string>;

        // read the json from the exampleTemplates folder
        var templateData = fs.readFileSync(
          "./src/JSONapiData/exampleTemplates/" + jobId.toString() + ".json",
          "utf8"
        );
        console.log(templateData);

        templateData = JSON.parse(templateData);

        // console.log("current jobid",jobId);

        // loop through the templateIds and get the template.json from the server with this specific id from the exampleTemplates folder
        await Promise.all(data.templates.map(async (templatedata) => {
          // console.log(templatedata.title);
          let sequenceRequestSuccess = true;

          // create a resume with that template and convert it to a image
          try {
            const request = await fetch(process.env.BACKEND + "/create_resume", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: templateData,
                template: templatedata.title,
              }),
            });

            // console.log(request.status);
            if (request.status === 200) {
              // convert pdf to base64
              const pdfData = await request.blob();
              const formData = new FormData();
              formData.append("file", pdfData, "file.pdf");

              const image = await fetch(process.env.BACKEND + "/getJpgPreview", {
                method: "POST",
                body: formData,
              });
              // console.log(image.status);
              if (image.status === 200) {
                const imageLink = await image.json();
                if (data.image) {
                  data.image[templatedata.title] = imageLink[0];
                } else {
                  data.image = {};
                  data.image[templatedata.title] = imageLink[0];
                }
              } else {
                console.log(image.body);
                sequenceRequestSuccess = false;
              }
            }
          }
          catch (err) {
            // request failed 
            // show some other image if the request failed (maybe a default image)
            // sequenceRequestSuccess = true;
            // if (data.image){
            //   data.image[templatedata.title] = //image in base64 default image hardcoded ; 
            // }
          }
          finally {
            if (!sequenceRequestSuccess) {
              if (data.image) {
                data.image[templatedata.title] = "";
              } else {
                data.image = {};
              }
            }
          }
        }));
        // console.log("return after map: ", Object.keys(data.image));
        return data;
      }

      return {} as jobDescriptionDataType;
    }),
  getNameById: procedure.input(
    z.object({
      jobId: z.number(),
    })
  ).query(async (opts) => {
    if (!JobDiscriptionData) {
      return "" as string;
    }
    const jobId = opts.input.jobId;
    if (JobDiscriptionData.hasOwnProperty(jobId)) {
      const data = JobDiscriptionData[jobId] as jobDescriptionDataType;
      // console.log(data.title);
      return data.title;
    }
    return "" as string;
  }),
});