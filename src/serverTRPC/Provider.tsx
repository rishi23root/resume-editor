"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { initTrpcClient, trpc } from "./client";

export default function TRPCProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({});
  const trpcClient = initTrpcClient();
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
