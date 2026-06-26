"use client";

import { ReactNode } from "react";

import { WagmiProvider } from "wagmi";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { wagmiAdapter } from "@/lib/appkit";

const queryClient = new QueryClient();

export default function AppKitProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
    >
      <QueryClientProvider
        client={queryClient}
      >
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}