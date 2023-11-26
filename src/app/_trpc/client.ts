'use client';

import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/server";


// import { createTRPCNext } from '@trpc/next';
// export const trpcNext = createTRPCNext<AppRouter>({});

export const trpc = createTRPCReact<AppRouter>({});

