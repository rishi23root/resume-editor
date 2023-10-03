import { ExternalAccount } from "@clerk/nextjs/server";


export type PrivateMetadata = {
    userDBid : string;
    name: string;
    linkedin?: ExternalAccount
}