'use server'
// handle all the actions to use use by the each pages 
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";



export async function userLogined(): Promise<PrivateMetadata | {}> {
    const user = await currentUser();
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
        // console.log("setting up user metadata: ",user?.id, newUser);
        await clerkClient.users.updateUserMetadata(user?.id as string,{
            "privateMetadata": {
                'userDBid': newUser.id,
                'name': user.firstName + " " + user.lastName
            }}
        )        
        // 3 redict user to the first time login sequence
        redirect('/New?new=true')
        } catch (e){
            return {}
        }

    } else{
        console.log("seems user is already exiting",user?.privateMetadata);
    }
    
    return user?.privateMetadata as PrivateMetadata
}