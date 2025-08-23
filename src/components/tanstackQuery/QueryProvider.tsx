"use client";

import { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import client from "@/src/lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default QueryProvider;
