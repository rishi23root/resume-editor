import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server";

// servers only one purpose of handling the request and returning the response

const handler = (req: Request) =>{
    return  fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => ({})
    });
}

export { handler as GET, handler as POST };