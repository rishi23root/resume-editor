import { keyValue } from "./utils";

export type templateArrayTypes = {
        title:string,
        description:string,      
    }

export type jobIdAndNameType = 
    keyValue<{
        title:string,
        templates:templateArrayTypes[]
    }>