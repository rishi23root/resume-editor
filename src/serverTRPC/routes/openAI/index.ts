// pathname: api/trpc/pdf/{functionNameHere}
import { prisma } from "@/lib/prisma";
import { privateProcedure, router } from "@/serverTRPC/trpc";
import { Inputs } from "@/types/builder";
import { PdfToSchema } from "@/utils/openai.util";
import { z } from "zod";

export const openAIRouter = router({
    // parse the pdf for and return the json data
    pdfTextToJson: privateProcedure.input(
        z.object({
            pdfText: z.any()
        }),
    ).query(async (opts) => {
        const text = opts.input.pdfText;

        console.log("[info] Analysing Text");

        // make openai request here
        try {
            // convert data to json using open ai api function calling
            // const text = "data here";
            const call = new PdfToSchema(text);
            const results = await call.extractSchema();
            console.log("[info] Analysing Done");

            return {
                jsonData: results as Inputs,
                error: ""
            };
        } catch (err) {
            console.log(err);
            return {
                error: "unable to extract text from the format :(, we are redirecting you to the manual form.",
                jsonData: {}
            };
        }
    }),

    // take pdf text and give ats recomandations
    getAtsAndRecommandation: privateProcedure.input(
        z.object({
            resumeId: z.string(),
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
                data: true
            }
        })


        if (resumeData) {
            // here we got the data now need to get the text of the pdf 
            // extract h
            // console.log(response);
            return {
                atsScore: 5, recommandations: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sapiente mollitia, repellat deleniti eos sed dignissimos cumque, cum, incidunt libero asperiores explicabo iusto doloremque autem adipisci in.Nobis, obcaecati sapiente."
            }
        } else {
            console.log("response error");
            throw new Error("resume entry not found");
            // return { status: 'error' }
        }
    })
});


// api rn from openai
// 1. pdfTextToJson
// takes schema to fill text into 
// takes text of pdf and full it in the schema provided

// 2. getAtsAndRecommandation 
// a. takes json data of resume
// b. returns ats score on the basis of recommendation


// so flow should be something like this
// for converting text to out schema json 

// try 1
// 1. use assistent api from openai
// 2. upload the relavent data to the knowlege base
// 3. teach the ai what exactly is the schema and what should be filled in it
// 4. use the ai to fill text into the schema

// try 2
// use openai function calling to extract the data from the text (cheapest and fastest way)

"John show  HR Specialist  john.show@example.com | +1 123-456-7890 | www.johnshow-resume.com | Noida  Linkedin | Twitter | Github  EDUCATION  HR Institute  Human Resource Management  Masters | Score: 78%  2013 - 2015  Business University  Business Administration  Bachelors | Score: 3.7 GPA  2009 - 2013  WORK  Talent Solutions Inc. | Senior HR Specialist  Apr 2020 - Present  • Managed end-to-end recruitment processes, including sourcing, interviewing, and onboarding  • Implemented employee engagement initiatives to enhance workplace satisfaction  • Provided guidance on HR policies, resolving employee queries and concerns  • Conducted training sessions on various HR topics for staff development  People Dynamics Ltd. | HR Generalist  Jun 2017 - Mar 2020  • Handled day-to-day HR operations, including employee relations and performance management  • Collaborated with department heads to understand staffing needs and develop recruitment strategies  • Facilitated training programs to promote a positive and inclusive work culture  • Maintained accurate HR records and ensured compliance with labor laws  HR Academy | HR Intern  Aug 2015 - May 2017  • Assisted in various HR functions, including recruitment, onboarding, and training coordination  • Gained practical experience in drafting HR documents and policies  • Participated in workshops and seminars on HR best practices  SKILLS  Tools:  • HRIS• Recruitment Software• Microsoft Office  PROJECTS  Employee Engagement Program  Training Sessions, Team Building Events  • Designed and implemented an employee engagement program to boost morale  • Conducted training sessions and organized team-building events  • Received positive feedback on improved workplace satisfaction  Recruitment Process Optimization  HRIS, Recruitment Software  • Led a project to optimize the recruitment process for efficiency and accuracy  • Implemented HRIS and recruitment software for streamlined processes  • Reduced time-to-hire and improved the quality of hires  AWARDS  HR Excellence Award - HR Association  2016-10-01  Employee Relations Achievement - Workplace Harmony Foundation  2019-07-01  \nmailto:john.show@example.com  https://www.linkedin.com/in/johnshow/ https://www.twitter.com/johnshow/ https://github.com/johnshow/ https://www.johnshow.com/ https://www.johnshow.com/employee-engagement https://www.peopledynamics.com/recruitment-optimization https://drive.google.com/file/d/1btwUi5c5t2rQ2gISsCOkLZiS01-g17OL/view?usp=sharing https://drive.google.com/file/d/1btwUi5c5t2rQ2gISsCOkLZiS01-g17OL/view?usp=sharing\n"

// ai discriptions 
// you are an expert in resume evaluating, when ever you are given a pdf text you will carefully read all the information present and give your honest view what is wrong and what should be updated and also provide to update location with it and remember do not make things up be specific and to the point 

// new

// you are an expert in text data labeling,
// 
//  and filling the most relevant information in the schema provided, 
// - you will carefully read all the information present 
// - leave fields blank which are not certain or relevant from the text provided 
// - fill the schema with the most relevant information 
// - remember do not make things 
