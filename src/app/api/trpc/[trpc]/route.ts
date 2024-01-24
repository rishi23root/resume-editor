import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/serverTRPC/routes";
import { createContext } from "@/serverTRPC/context";

// servers only one purpose of handling the request and returning the response

const handler = async (req: Request) => {
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext
    });
}

export { handler as GET, handler as POST };