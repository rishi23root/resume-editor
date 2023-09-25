// import prisma from "../prisma/index";
// import prisma from "@/prisma/index"
import { prisma } from "@/lib/prisma";

// get user 
export async function getUserByClearkId(clerkId: string|null) {
    if (clerkId === null) return null
    const user =  await prisma.user.findFirst({
        where: {
            cleckId: clerkId
        }
    })
    console.log(user);
    return user
}


// get user notifications
