import { Inputs } from "@/types/builder";
import { PdfToSchema } from "@/utils/openai/util";

// resume parser api it will use edge server 
export const runtime = 'edge';

function streamTillPromise(cb: Promise<any>) {
    var isResolved = false;
    const results = cb.then((data: any) => {
        isResolved = true;
        console.log('[resolved]');
        return data;
    }).catch((err: any) => {
        isResolved = true;
        console.log('[rejected]');
        return err;
    })

    const encoder = new TextEncoder();

    return new ReadableStream({
        start(controller) {
            const timer = setInterval(async () => {
                if (isResolved) {
                    var res: any;
                    try {
                        res = (await results);
                        if (typeof res === 'object') {
                            res = JSON.stringify(res);
                        }
                        controller.enqueue(encoder.encode(res));
                    } catch (err) {
                        controller.enqueue(encoder.encode('error: ' + err));
                    } finally {
                        controller.close();
                        clearInterval(timer);
                    }
                } else {
                    controller.enqueue(encoder.encode('0'));
                }
            }, 300);
        },
    });
}

export async function POST(request: Request) {
    const { pdfText } = await request.json();

    async function heavyTaskWrapper(text: string) {
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
                jsonData: {},
                error: "pdfText not found in the request body",
            }
        }
    }
    const stream = streamTillPromise(heavyTaskWrapper(pdfText as string));

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        },
    });
}

