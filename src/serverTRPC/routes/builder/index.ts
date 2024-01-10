// pathname: api/trpc/pdf/{functionNameHere}
import { defaultTemplate } from "@/JSONapiData/builder";
import { prisma } from "@/lib/prisma";
import { procedure, router } from "@/serverTRPC/trpc";
import { Inputs } from "@/types/builder";
import { getUserData } from "@/utils/dbUtils";
import { z } from "zod";

import { JobDiscriptionData } from "@/JSONapiData/jobDescriptionData/";
import { jobDescriptionDataType } from "@/types/jobDescription";
import * as fs from "node:fs";

export const builderRouter = router({

  getDefault: procedure.input(
    z.object({
      jobId: z.number(),
    })
  ).query(async (opts) => {

    // load the json file and remove all elements
    var data = defaultTemplate as Inputs

    if (!JobDiscriptionData) {
      return {} as jobDescriptionDataType;
    }

    const jobId = opts.input.jobId;

    if (JobDiscriptionData.hasOwnProperty(jobId)) {
      // read the json from the exampleTemplates folder
      var templateData = fs.readFileSync(
        "./src/JSONapiData/exampleTemplates/" + jobId.toString() + ".json",
        "utf8"
      );
      if (templateData) {
        data = JSON.parse(templateData);
      }
    }


    // let mask = data.mask;
    // let skillMask = data.skills.mask;
    // remove all data from the data object
    // data = makeEmptyObject(data);
    // data = { ...data, mask, skills: { ...data.skills, mask: skillMask } };

    // append default values
    const userInfo = await getUserData(opts.input.jobId);
    data.basics.name = userInfo.name
    data.basics.email = userInfo.email
    data.basics.label = userInfo.label;

    return data;
  }),

  // function get the data form a specific resume id
  getDataByResumeId: procedure.input(
    z.object({
      id: z.string(),
      userId: z.string(),
    })
  ).query(async (opts) => {
    // get data from the database because id is valid this will run only on server side so its safe
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

      return JSON.parse(resumeData.data, (key, value) => {
        return value === 'undefined' ? null : value;
      }) as Inputs
    }
    throw new Error("resume data not found");
  }),

  // function to update the data form a specific resume id
  updateDataByResumeId: procedure.input(
    z.object({
      id: z.string(),
      userId: z.string(),
      data: z.string(),
    })
  ).mutation(async (opts) => {
    // need to check if the id is valid and user id is valid
    // check validity and update
    const resumeData = await prisma.resumeData.findUnique({
      where: {
        id: opts.input.id,
        userId: opts.input.userId,
        // paymentStatus: 'paid',
      },
      select: {
        id: true,
      }
    })

    if (resumeData) {
      // console.log("saving data", Object.entries(JSON.parse(opts.input.data).education[0]));

      // console.log('resume data found');
      const response = await prisma.resumeData.update({
        where: {
          id: opts.input.id,
        },
        data: {
          data: opts.input.data,
        }
      })
      // console.log(response);
      return { status: 'success' }
    } else {
      console.log("response error");
      throw new Error("resume entry not found");
      // return { status: 'error' }
    }
  }),

  // function to generate new pdf
  generatePDF: procedure.input(
    z.object({
      id: z.string(),
      templateName: z.string()
    })
  ).query(async (opts) => {
    // console.log('renerating new pdf');
    // let start = performance.now();

    const resumeId = opts.input.id;
    const templateName = opts.input.templateName;

    // get data from the database because id is valid this will run only on server side so its safe
    const resumeData = await prisma.resumeData.findUnique({
      where: {
        id: resumeId,
      },
      select: {
        data: true,
      }
    })

    if (!resumeData) {
      return {
        images: [] as string[], error: "resume data not found must be wrong id, try again"
      }
    }
    // console.log("genrating pdf: ", Object.keys(JSON.parse(resumeData?.data as string).education[0]));


    try {
      const request = await fetch(process.env.BACKEND + "/create_resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: JSON.parse(resumeData.data),
          template: templateName,
        }),
      });

      // console.log(request.status);
      if (request.status === 200) {
        // console.log(2);

        // convert pdf to base64
        const pdfData = await request.blob();
        const formData = new FormData();
        formData.append("file", pdfData, "file.pdf");

        const image = await fetch(process.env.BACKEND + "/getJpgPreview", {
          method: "POST",
          body: formData,
        });
        // console.log(3);

        // console.log(image.status);
        if (image.status === 200) {
          // console.log(4);

          const imageLink = await image.json();
          // console.log("time taken to generate pdf: ", performance.now() - start, "ms");

          return {
            images: imageLink as string[], error: ""
          }
        } else {
          return {
            images: [] as string[], error: "unable to convert into images from pdf, server errror"
          }
        }
      }

      // console.log("tesing", JSON.parse(resumeData.data).education);

      return {
        images: [] as string[], error: await request.text()
      }
    }
    catch (err) {
      throw new Error("unable to generate resume");
    }
  }),

});


