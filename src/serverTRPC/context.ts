import { currentUser } from '@clerk/nextjs';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export async function createContext() {
    const user = await currentUser();
    const userDBid = user?.privateMetadata?.userDBid;

    // console.log("creating context for protected route 🥺");

    return {
        id: user?.id,
        dbId: userDBid
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
