// resume parser api it will use edge server 
import { Inputs } from "@/types/builder";
import { PdfToSchema } from "@/utils/openai.util";
import { streamTillPromise } from "@/utils/util";

export const runtime = 'edge';

export async function POST(request: Request) {
    const { pdfText } = await request.json();
    // const { searchParams } = new URL(request.url)
    // const pdfText = searchParams.get('pdfText')
    // console.log(pdfText);
    async function worker(text: string) {
        if (text) {
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
        } else {
            return {
                status: 400,
                message: "pdfText not found in the request body",
            }
        }
    }
    const stream = streamTillPromise(worker(pdfText as string));

    // const decoder = new TextDecoder();
    // const encoder = new TextEncoder();
    // TransformStreams can transform a stream's chunks
    // before they're read in the client
    // const transformStream = new TransformStream({
    //     transform(chunk, controller) {
    //         // Decode the content, so it can be transformed
    //         const text = decoder.decode(chunk);
    //         // Make the text uppercase, then encode it and
    //         // add it back to the stream
    //         controller.enqueue(encoder.encode(text.toUpperCase()));
    //     },
    // });
    // return new Response(stream.pipeThrough(transformStream), {

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        },
    });
}






















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
