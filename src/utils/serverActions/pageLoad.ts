// handle all the actions to use use by the each pages 
import { currentUser, auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PageProps } from "@/types/utils";
import { ExternalAccount, User } from "@clerk/nextjs/server";
import { PrivateMetadata } from "@/types/user";

export async function userLogined(): Promise<PrivateMetadata | {}> {
    const user = await currentUser();
    
    if (!user) return {}
    
    var redirectPage = ""
    // if user does not have private metadata that means user is new to platform 
    if (!Object.keys(user?.privateMetadata as object).length && user?.id) {
        // 1. create user in database 
        try{
        const newUser = await prisma.user.create({
            data: {
                name: (user.firstName ? user.firstName: "Blank_Name" ) +  (user?.lastName? " " + user.lastName:""),
                clerkId: user.id
            },
            select: {
                id: true,
            }
        })

        // 2. update user metadata for the application 
        // for more info see https://clerk.com/docs/users/metadata
        // console.log("setting up user metadata: ",user?.id, newUser);
        await clerkClient.users.updateUserMetadata(user?.id as string,{
            "privateMetadata": {
                'userDBid': newUser.id,
                'name': (user.firstName ? user.firstName: "Blank_Name" ) +  (user?.lastName? " " + user.lastName:"") 
            }}
        )        
        // 3 redict user to the first time login sequence 
        redirectPage = '/New' 
        } catch (e){
            console.error(e);
            return {}
        }
    } else{
        console.debug("User is already exiting with private Metadata :",Object.keys(user?.privateMetadata as object));
    }
    
    // check if user have is from linkedin account 
    if (!user?.privateMetadata?.linkedin) {
        const linkedinUser = await checkIfFromLinkedin(user);
        if (linkedinUser){
            try{
                // update the metadata
                await clerkClient.users.updateUserMetadata(user?.id as string,{
                    "privateMetadata": {
                        'linkedin': linkedinUser ? true : false
                    }}
                )
                // update the database
                await prisma.user.update({
                    data: {
                        isLinkedLogin : linkedinUser ? true : false
                    },
                    where: {
                        clerkId: user.id
                    }
                })
                redirectPage = '/New/parsePDF' 
            } catch (e){
                console.error(e);
                return {}
            }
        }
    }

    redirectPage && redirect(redirectPage)
    
    return user?.privateMetadata as PrivateMetadata
}

export async function checkIfFromLinkedin(user:User|null): Promise< ExternalAccount| Boolean> {
    // console.log(user?.externalAccounts);
    // loop through the accounts and check provider
    var data = user?.externalAccounts.filter(account => account.verification?.strategy.includes('oauth_linkedin')) as ExternalAccount[];
    var account : ExternalAccount| Boolean = false;
    if (data.length > 0) account = data[0]
    return account;
}


// add 
// handle each page load event
// add custom search parameters and use existing parameters and take action accordingly

export async function handlePageProps(currentPath:string, params:PageProps){
    // check for which user is currently on then prove the user with the necessary data accordingly
    // manupulate the parameters
    
    // console.log(currentPath, params);
    return params
}
