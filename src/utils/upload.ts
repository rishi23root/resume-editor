'use server'

import { expireInDays } from "@/components/pageSpecific/dashboard/utils";
import prisma from "@/lib/prisma";
import { JsonType } from "@/types/utils";
import { currentUser } from "@clerk/nextjs";

export async function extractPdfText(formData: FormData) {
    const file = formData.get("file") as any;
    // console.log(file)
    if (file.type === "application/pdf") {
        console.log("[info] extracting data from the pdf file");

        // extract text from pdf file
        const formData = new FormData();
        formData.append("file", file);



        // console.log("[info] making request", process.env.BACKEND + "/extract_text");
        const req = await fetch(process.env.BACKEND + "/extract_text", { method: "POST", body: formData })
        try {
            const extractedText = await req.json();
            console.log(extractedText);
            console.log("[info] extraction done", extractedText);
            // console.log("[info] extraction done:", extractedText);
            return extractedText;
        } catch (err) {
            console.log(err);
            return {
                error: {
                    title: "Error with file type",
                    des: "unable to process file type, :( try again with a pdf file."
                }
            }
        }

    } else {
        return {
            error: {
                title: "Error with file type",
                des: "unable to process file type, :( try again with a pdf file."
            }
        }
    }

}

export async function saveJsonObject(jsonData: JsonType) {
    // console.log("[info] saving json data", jsonData);
    try {
        // schema.parse(jsonData);
        // check if data is valid
        const user = await currentUser();
        const userDBid = user?.privateMetadata?.userDBid;
        // create new db instance
        // find the last pending resume data and update it
        const lastResume = await prisma.resumeData.findFirst({
            where: {
                userId: userDBid as string,
                paymentStatus: "pending",
                // and not expired
                // creaatedAt: {
                //     gt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * expireInDays) // 24 hours
                // }
            },
            orderBy: {
                creaatedAt: "desc"
            },
            select: {
                id: true,
                payId: true,
                jobId: true,
                paymentStatus: true,
                paymentId: true,
            }
        })

        // console.log("jsonData", jsonData)
        // console.log("lastResume", lastResume)

        var currentResume: any;
        if (lastResume) {
            console.log("[info] updating last resume data");

            currentResume = await prisma.resumeData.update({
                where: {
                    id: lastResume.id
                },
                data: {
                    data: JSON.stringify(jsonData),
                    creaatedAt: new Date(),
                },
                select: {
                    id: true,
                    payId: true,
                    jobId: true,
                    paymentStatus: true,
                    paymentId: true,
                }
            })
            return {
                data: {
                    jsonDataId: currentResume.id,
                }
            }
        } else {
            console.log("[info] creating new resume data");

            // console.log('[josnData]', jsonData)
            currentResume = await prisma.resumeData.create({
                data: {
                    data: JSON.stringify(jsonData),
                    payId: 0,
                    jobId: 0,
                    paymentId: "",
                    template: "",
                    paymentStatus: "pending",
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
                    jsonDataId: currentResume.id,
                }
            }
        }
    } catch (err) {
        console.log(err);
        // error with json data
        return {
            error: {
                title: "Error with json data",
                des: "unable to process json data, :( try again with a valid json file."
            }
        }
    }

}