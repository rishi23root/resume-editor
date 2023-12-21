import { keyValue } from "./utils";

export type jobDescriptionDataType = {
        title:string,
        templates:{title:string}[],
        jobDes:string,
        mask: keyValue<string>,
        image?: keyValue<string>,
    }

export type jobIdAndNameType = 
    keyValue<jobDescriptionDataType>