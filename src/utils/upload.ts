'use server';

import { serverAPI } from "@/serverTRPC/serverAPI";
import { JsonType } from "@/types/utils";

// handle parsing and data extraction from linkedin pdf file
export async function uploadFile(formData: FormData){
    // extract file from form data
    const file = formData.get("file") as any; 

    // check file type it should be pdf or json file
    if ([ "application/pdf", "application/json" ].includes(file.type)) {
        
        // let josnData: JsonType;
        
        // parse pdf file or json file accordingly
        const josnData = (file.type === "application/pdf") 
        // parse pdf file
            ? serverAPI.pdf.parse({pdf: file})
            // read json file from buffer and parse it as json
            : JSON.parse(Buffer.from(await file.arrayBuffer()).toString());

        // ############ to do
        // complete the pdf.parse route
        // save a dummy data to the database
        // setup builder page such than if someone comming from no procegure just make some thing default to use the  

        
        // take the extracted data and save it to the database
        console.log(josnData);

        // return the id of the saved data
        
            
        return {
            data:{
                jsonDataId : "1234"
            }
        }
        
    } else {
        // error with file type
        return {
            error:{
                title:"Error with file type",
                des: "unable to process file type, :( try again with a pdf or json file."
            }
        }
    }
    
}