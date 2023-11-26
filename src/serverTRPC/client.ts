'use client';

import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/serverTRPC/routes";
import { httpBatchLink } from "@trpc/client";
import { base_url } from "./util";


export const trpc = createTRPCReact<AppRouter>({});


// any update for the client should be done here
export function initTrpcClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: `${base_url}/api/trpc`,
      }),
    ],
  });
}
