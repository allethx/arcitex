import { useAccount, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

export function useWallet() {
  const { open } = useAppKit();

  const {
    address,
    isConnected,
    chain,
  } = useAccount();

  const { disconnect } = useDisconnect();

  return {
    connected: isConnected,
    address,
    chain,
    connect: () => open(),
    disconnect,
  };
}