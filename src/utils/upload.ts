'use server'

import { schema } from "@/components/pageSpecific/builder/schema";
import { prisma } from "@/lib/prisma";
import { serverAPI } from "@/serverTRPC/serverAPI";
import { JsonType } from "@/types/utils";
import { currentUser } from "@clerk/nextjs";

// handle parsing and data extraction from linkedin pdf file    
export async function uploadFile(formData: FormData) {
    // extract file from form data
    const file = formData.get("file") as any;
    // check file type it should be pdf or json file
    if (["application/pdf", "application/json"].includes(file.type)) {
        // parse pdf file or json file accordingly

        var jsonData: JsonType;
        if (file.type === "application/pdf") {
            // extract text from pdf file
            const formData = new FormData();
            formData.append("file", file);
            const req = await fetch(process.env.BACKEND + "/extract_text", { method: "POST", body: formData })
            const extractedText = await req.json();

            // convert extracted text to json data
            const data = await serverAPI.pdf.parse({ pdfText: extractedText });

            if (data.error || !data.jsonData) {
                return {
                    error: {
                        title: "Error with pdf file",
                        des: data.error
                    }
                }
            } else {
                jsonData = data.jsonData;
            }
        } else {
            jsonData = JSON.parse(Buffer.from(await file.arrayBuffer()).toString());
            // check if data is valid
            try {
                schema.parse(jsonData);
            } catch (err) {
                // error with json data
                return {
                    error: {
                        title: "Error with json data",
                        des: "unable to process json data, :( try again with a valid json file."
                    }
                }
            }
        }

        // check if data is valid
        const user = await currentUser();
        const userDBid = user?.privateMetadata.userDBid;
        // create new db instance
        const newResume = await prisma.resumeData.create({
            data: {
                data: JSON.stringify(jsonData),
                payId: 0,
                jobId: 0,
                paymentId: "",
                template: "",
                user: {
                    connect: {
                        id: userDBid as string
                    }
                }
            },
            select: {
                id: true,
                payId: true,
                jobId: true,
                paymentStatus: true,
                paymentId: true,
            }
        })
        // console.log(newResume);
        return {
            data: {
                jsonDataId: newResume.id,
            }
        }

    } else {
        // error with file type
        return {
            error: {
                title: "Error with file type",
                des: "unable to process file type, :( try again with a pdf or json file."
            }
        }
    }

}