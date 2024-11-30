"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface WalletConnectProps {
  onConnect: () => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const handleConnect = () => {
    // Simple mock connection for UI demonstration
    onConnect();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <Wallet className="h-12 w-12 text-muted-foreground" />
      <h3 className="text-lg font-semibold">Connect Wallet</h3>
      <p className="text-sm text-muted-foreground text-center">
        Connect your wallet to access DeFi features
      </p>
      <Button onClick={handleConnect} className="w-full">
        Connect Wallet
      </Button>
    </div>
  );
}
