// handel files type check and get the data from the file text or json

import { schema } from "@/components/pageSpecific/builder/schema";
import { JsonType } from "@/types/utils";
import { toast } from "sonner";
import { extractPdfText } from "./upload";

export const fileHandeler = async (file: File, formatDataInSchema: any): Promise<{
    type: "pdf" | "json",
    jsonData: JsonType | string
}> => {
    // returns an object with type, jsonData on success else error
    return new Promise(async (resolve, reject) => {
        var jsonData: JsonType;
        if (file.type === "application/pdf") {
            // to do here
            // extract data form pdf
            // convert to json
            // save to mutation
            // then process the data
            const formData = new FormData();
            formData.append("file", file);
            const pdfText = await extractPdfText(formData)
            if (pdfText.error) {
                console.log("[error] extracting pdf text error :", pdfText.error);
                reject({
                    error: {
                        title: "Error with extracting pdf text",
                        des: "unable to extract text from pdf, :( try again with a valid pdf file."
                    }
                })
                return
            }
            toast("Text Extracted successfully", {
                description: "Now converting to json data",
                position: "top-center",
                duration: 2000
            });

            setTimeout(() => {
                toast("Converting text to schema", {
                    description: "Now converting json data to schema",
                    position: "top-center",
                    duration: 2000
                });
            }, 2500);

            // console.log("[info] extraction done");

            await formatDataInSchema({ pdfText })
            resolve({
                type: "pdf",
                jsonData: "formated data is saved in mutation"
            });
        } else {
            toast("Text Extracted successfully", {
                description: "Now converting to json data",
                position: "top-center",
                duration: 2000
            });
            jsonData = JSON.parse(Buffer.from(await file.arrayBuffer()).toString());
            // check if data is valid
            try {
                schema.parse(jsonData);
            } catch (err) {
                // error with json data
                reject({
                    error: {
                        title: "Error with json data",
                        des: "unable to process json data, :( try again with a valid json file."
                    }
                })
            }
            toast("Converting text to schema", {
                description: "Now converting json data to schema",
                position: "top-center",
                duration: 2000
            });
            resolve({ jsonData, type: "json" });
        }


    })
}