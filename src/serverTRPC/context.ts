import { currentUser } from '@clerk/nextjs';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export async function createContext(opts: FetchCreateContextFnOptions) {
    const user = await currentUser();
    const userDBid = user?.privateMetadata.userDBid;

    // console.log("creating context for protected route 🥺");

    return {
        id: user?.id,
        dbId: userDBid,
        req: opts.req,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
