// resume parser api it will use edge server 
import { Inputs } from "@/types/builder";
import { PdfToSchema } from "@/utils/openai.util";
import { NextResponse } from "next/server";

const sleep = (ms = 10000) => new Promise((resolve) => setTimeout(resolve, ms));

// export default async function handler(req, res) {
//     // get pdfText from the request
//     const text = req.body?.pdfText;

//     if (text) {
//         try {
//             // convert data to json using open ai api function calling
//             // const text = "data here";
//             const call = new PdfToSchema(text);
//             const results = await call.extractSchema();
//             console.log("[info] Analysing Done");

//             return {
//                 jsonData: results as Inputs,
//                 error: ""
//             };
//         } catch (err) {
//             console.log(err);
//             return {
//                 error: "unable to extract text from the format :(, we are redirecting you to the manual form.",
//                 jsonData: {}
//             };
//         }
//     } else {
//         return NextResponse.json({
//             status: 400,
//             message: "pdfText not found in the request body",
//         });
//     }

// }

// testing for the edge server

// export default async function GET(req, res) {
//     await sleep(10000);

//     console.log("Request received");

//     // NextResponse.json({
//     //     status: 200,
//     //     message: "pdfText not found in the request body",
//     // });
//     res.json({ message: 'There was an error with the upstream service!' })
// }

export async function GET(request: Request) {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')

    await sleep(20000)

    return Response.json({ 'a': true })
}