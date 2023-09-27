// handle all the actions to use use by the each pages 
import { currentUser, auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PageProps } from "@/types/utils";

export async function userLogined(): Promise<PrivateMetadata | {}> {
    const user = await currentUser();
    
    if (!user) return {}
    
    // if user does not have private metadata that means user is new to platform 
    if (!Object.keys(user?.privateMetadata as object).length && user?.id) {
        // 1. create user in database 
        try{
        const newUser = await prisma.user.create({
            data: {
                name: (user.firstName + ' ' + user.lastName),
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
                'name': user.firstName + " " + user.lastName
            }}
        )        
        // 3 redict user to the first time login sequence 
        redirect('/New?new=true') // update the correct search params here to start the resume building
        } catch (e){
            return {}
        }
    } else{
        console.log("seems user is already exiting",user?.privateMetadata);
    }
    
    return user?.privateMetadata as PrivateMetadata
}

// add 
// handle each page load event
// add custom search parameters and use existing parameters and take action accordingly

export async function handlePageProps(currentPath:string, params:PageProps){
    // console.log(currentPath, params);
    // check for which user is currently on then prove the user with the necessary data accordingly

    

    
}
