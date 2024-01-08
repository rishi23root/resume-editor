import { JobDiscriptionData } from "@/JSONapiData/jobDescriptionData/";
import { jobDescriptionDataType } from "@/types/jobDescription";
import { currentUser } from "@clerk/nextjs";

// function to get the user's email address and name from clerk 
export async function getUserData(jobId?: number) {
    const user = await currentUser();
    const returnDict = { name: "", email: "", label: "" }
    if (user) {
        returnDict.name = user.firstName as string + " " + user.lastName as string
        let primaryAddress = user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress
        returnDict.email = primaryAddress ? primaryAddress as string : ""
    }
    if (jobId) {
        if (JobDiscriptionData && JobDiscriptionData.hasOwnProperty(jobId)) {
            const data = JobDiscriptionData[jobId] as jobDescriptionDataType;
            returnDict.label = data.title;
        }
    }
    return returnDict
}