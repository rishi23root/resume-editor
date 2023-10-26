// handle all the actions to use use by the each pages 
import { prisma } from "@/lib/prisma";
import { PrivateMetadata } from "@/types/user";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { checkIfFromLinkedin } from "@/utils/linkedinUtil";

export async function newUserLoginHandler(): Promise<PrivateMetadata | {}> {
    // effective only for new login accounts
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
    } 
    // else{
    //     console.debug("User is already exiting with private Metadata :",Object.keys(user?.privateMetadata as object));
    // }
    
    // check if user have is from linkedin account add boolean in metadata
    if (!user?.privateMetadata?.linkedin) {
        // console.log("linkedin account not found ");
        
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


