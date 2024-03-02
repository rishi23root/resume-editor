// pathname: api/trpc/pdf/{functionNameHere}
import { defaultTemplate } from "@/JSONapiData/builder";
import { getTemplateByID } from "@/JSONapiData/exampleTemplates";
import { JobDiscriptionData } from "@/JSONapiData/jobDescriptionData/";
import { prisma } from "@/lib/prisma";
import { makeEmptyObject } from "@/lib/utils";
import { privateProcedure, procedure, router } from "@/serverTRPC/trpc";
import { Inputs } from "@/types/builder";
import { jobDescriptionDataType } from "@/types/jobDescription";
import { getUserData } from "@/utils/dbUtils";
import { TRPCError } from "@trpc/server";
import { error } from "console";
import { z } from "zod";
// import { 1, 2, 3, 4} from "@JSONapiData/exampleTemplates";

export const builderRouter = router({

  getEmptyField: procedure.input(z.object({
    key: z.string(),
  })).mutation(async (opts) => {
    var data = defaultTemplate as Inputs
    var key = opts.input.key;
    var allLevels = key.split('.');
    if (allLevels.length > 1) {
      // get the data from the data object
      var tempData = data;
      for (let i = 0; i < allLevels.length; i++) {
        if (i === allLevels.length - 1) {
          tempData = tempData[allLevels[i]];
        } else {
          tempData = tempData[allLevels[i]];
        }
      }
      return makeEmptyObject(tempData) as any;
    }

    var firstEntry = (data[opts.input.key as keyof Inputs] as any[])[0]
    return makeEmptyObject(firstEntry) as any;
  }),

  // get the default data for the builder first time and save it in DB
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
      var templateData = getTemplateByID(jobId.toString());
      // var templateData = fs.readFileSync(
      //   "./src/JSONapiData/exampleTemplates/" + jobId.toString() + ".json",
      //   "utf8"
      // );
      if (templateData) {
        data = templateData as Inputs;
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
      resumeId: z.string(),
      userId: z.string(),
    })
  ).query(async (opts) => {
    // get data from the database because id is valid this will run only on server side so its safe
    const resumeData = await prisma.resumeData.findUnique({
      where: {
        id: opts.input.resumeId,
        userId: opts.input.userId
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
    } else {
      return {
        error: "resume data not found must be wrong id, try again"
      }
    }
    // throw new TRPCError({ code: "BAD_REQUEST", message: "resume data not found" })
  }),

  // function to update the data form a specific resume id
  updateDataByResumeId: privateProcedure.input(
    z.object({
      resumeId: z.string(),
      data: z.string(),
    })
  ).mutation(async (opts) => {
    // need to check if the id is valid and user id is valid
    // check validity and update
    const resumeData = await prisma.resumeData.findUnique({
      where: {
        id: opts.input.resumeId,
        userId: opts.ctx.dbId as string,
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
          id: opts.input.resumeId,
        },
        data: {
          data: opts.input.data,
        }
      })
      // console.log(response);
      return { status: 'success' }
    } else {
      console.log("response error");
      throw new TRPCError({ code: "BAD_REQUEST", message: "resume data not found" })
      // return { status: 'error' }
    }
  }),

  // function to generate new pdf
  generatePDF: privateProcedure.input(
    z.object({
      resumeId: z.string(),
      templateName: z.string()
    })
  ).mutation(async (opts) => {
    console.log('renerating new pdf images');
    // let start = performance.now();

    const resumeId = opts.input.resumeId;
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
        images: [] as string[],
        error: "resume data not found must be wrong id, try again"
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
        // convert pdf to base64
        const pdfData = await request.blob();
        const formData = new FormData();
        formData.append("file", pdfData, "file.pdf");
        formData.append("compress", 'true');

        const image = await fetch(process.env.BACKEND + "/getJpgPreview", {
          method: "POST",
          body: formData,
        });

        // console.log(image.status);
        if (image.status === 200) {
          // console.log(4);
          var imageLinkArr = await image.json() as string[];
          var imageLink = imageLinkArr[0] as string
          // convert the file to base64 string and save it into the database
          // console.log('updating db with new pdf image in pdfitself')
          const updateReq = await prisma.resumeData.update({
            where: {
              id: resumeId,
            },
            data: {
              pdfItself: imageLink,
            },
            select: {
              id: true,
              // pdfItself: true,
            }
          })
          console.log("updated", updateReq)

          return {
            images: imageLinkArr,
            error: ""
          }
        } else {
          return {
            images: [] as string[],
            error: "unable to convert into images from pdf, server errror"
          }
        }
      }

      // console.log("tesing", JSON.parse(resumeData.data).education);

      return {
        images: [] as string[],
        error: await request.text()
      }
    }
    catch (err) {
      return {
        images: [] as string[],
        error: "uaable to generate pdf for this resume id, try again or report"
      }
      // throw new TRPCError({ code: "BAD_REQUEST", message: "resume data not found" })
    }
  }),

  // del a specific resume id
  delByResumeId: privateProcedure.input(
    z.object({
      resumeId: z.string(),
      // userId: z.string(),
    })
  ).mutation(async (opts) => {
    console.log('delting resume Entry');
    // get data from the database because id is valid this will run only on server side so its safe
    const resumeData = await prisma.resumeData.delete({
      where: {
        id: opts.input.resumeId,
        userId: opts.ctx.dbId as string,
      }
    })
    if (resumeData) {
      // console.log('resume data found');
      return resumeData
    }
    throw new TRPCError({ code: "BAD_REQUEST", message: "resume data not found" })
  }),

  // get pdf file for a specific resume id
  getPDFByResumeId: privateProcedure.input(
    z.object({
      resumeId: z.string(),
      templateName: z.string().nullish(),
    })
  ).mutation(async (opts) => {
    console.log('renerating new pdf only');

    const templateName = opts.input.templateName;
    const resumeData = await prisma.resumeData.findUnique({
      where: {
        id: opts.input.resumeId,
        userId: opts.ctx.dbId as string,
      },
      select: {
        data: true,
        template: true,
      }
    })

    if (!resumeData) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "resume data not found" })
    }

    // console.log("genrating pdf: ", Object.keys(JSON.parse(resumeData?.data as string).education[0]));

    try {
      const response = await fetch(process.env.BACKEND + "/create_resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: JSON.parse(resumeData.data),
          template: templateName ? templateName : resumeData.template,
        }),
      });

      // console.log(23)
      // console.log(response.status);
      if (response.status === 200) {
        // console.log(24)
        const buffer = Buffer.from(await response.arrayBuffer())
        const basedata = buffer.toString('base64')
        return basedata
      }
      else {
        throw new TRPCError({ code: "BAD_REQUEST", message: "resume data not found" })

      }
    }
    catch (err) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "resume data not found" })
    }
  }),

  // get pdf schema file for a specific resume id
  getSchemaByResumeId: privateProcedure.input(
    z.object({
      resumeId: z.string(),
    })
  ).mutation(async (opts) => {
    console.log('renerating new pdf schema only');
    // get data from the database because id is valid this will run only on server side so its safe
    const resumeData = await prisma.resumeData.findUnique({
      where: {
        id: opts.input.resumeId,
        userId: opts.ctx.dbId as string
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
    throw new TRPCError({ code: "BAD_REQUEST", message: "resume data not found" })
  }),

  // get user account info 
  getAllResume: privateProcedure.input(
    z.object({
      userId: z.string(),
    })
  ).query(async (opts) => {
    console.log('getting all resume for', opts.input.userId);

    // get data from the database because id is valid this will run only on server side so its safe
    const resumeData = await prisma.resumeData.findMany({
      where: {
        userId: opts.input.userId,
      },
      select: {
        id: true,
        pdfItself: true,
        template: true,
        payId: true,
        jobId: true,
        paymentStatus: true,
        creaatedAt: true,
      },
      orderBy: {
        creaatedAt: 'desc'
      }
    })
    if (resumeData) {
      // console.log(resumeData);
      return resumeData
    } else {
      return {
        error: "resume data not found must be wrong userid, try again"
      }
    }
    // throw new TRPCError({ code: "BAD_REQUEST", message: "resume data not found" })
  }),
});


