"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConnection } from "arweave-wallet-kit";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { LiquidityStats } from "./liquidity-stats";
import { WalletConnect } from "./wallet-connect";

const supportedTokens = [
  { id: "eth", name: "Ethereum", symbol: "ETH" },
  { id: "usdc", name: "USD Coin", symbol: "USDC" },
  { id: "dai", name: "Dai", symbol: "DAI" },
];

const lockPeriods = [
  { value: "0", label: "No Lock" },
  { value: "30", label: "30 Days" },
  { value: "90", label: "90 Days" },
  { value: "180", label: "180 Days" },
];

export default function LiquidityInterface() {
  const { toast } = useToast();
  const { connected, connect, disconnect } = useConnection();

  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [lockPeriod, setLockPeriod] = useState("0");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleProvideLiquidity = async () => {
    try {
      // Implement liquidity provision logic here
      toast({
        title: "Processing Transaction",
        description: "Please wait while we process your transaction...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to provide liquidity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const estimatedApy = 5.67; // Replace with real APY calculation

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Provide Liquidity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!connected ? (
            <WalletConnect onConnect={() => connect()} />
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="token">Select Token</Label>
                <Select value={selectedToken} onValueChange={setSelectedToken}>
                  <SelectTrigger id="token">
                    <SelectValue placeholder="Select a token" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedTokens.map((token) => (
                      <SelectItem key={token.id} value={token.id}>
                        {token.name} ({token.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Estimated APY: {estimatedApy}%
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lockPeriod">Lock Period</Label>
                <Select value={lockPeriod} onValueChange={setLockPeriod}>
                  <SelectTrigger id="lockPeriod">
                    <SelectValue placeholder="Select lock period" />
                  </SelectTrigger>
                  <SelectContent>
                    {lockPeriods.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I accept the terms and conditions
                </label>
              </div>

              <Button
                className="w-full"
                disabled={!amount || !selectedToken || !termsAccepted}
                onClick={handleProvideLiquidity}>
                Provide Liquidity
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <LiquidityStats />
    </div>
  );
}
