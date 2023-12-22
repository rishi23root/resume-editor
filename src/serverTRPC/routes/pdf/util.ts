import { z } from "zod";

export const pdfFileSchema = z
        .any()
        .refine((files) => files?.length === 0, "pdf is required :().") 
        .refine((files) => files?.length > 1, "single pdf is required :(.") 
        // checks for a instance of a File
        .refine((files) => files.instanceof(File), "should be a file")
        // .refine((files) => files?.[0]?.size >= MAX_FILE_SIZE, `Max file size is 5MB.`) 
        // check for file type
        .refine((files) => files?.[0]?.type === "application/pdf", "only .pdf files are accepted.")

