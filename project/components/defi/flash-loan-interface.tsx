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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WalletConnect } from "./wallet-connect";
import { TransactionPreview } from "./transaction-preview";
import { useConnection } from "arweave-wallet-kit";

const supportedTokens = [
  {
    id: "ARUSDC",
    name: "ARUSDC",
    symbol: "ARUSDC",
    ao_id: "AOPvl2mFYyTlxUk1pqMYVgPNueFaC_7dxBMOo64oY0A",
  },
];

export default function FlashLoanInterface() {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const { connected, connect, disconnect } = useConnection();

  const [contractAddress, setContractAddress] = useState("");

  const handleExecuteFlashLoan = async () => {
    try {
      // Implement flash loan execution logic here
      toast({
        title: "Processing Flash Loan",
        description: "Please wait while we process your transaction...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to execute flash loan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const flashLoanFee = 0.07; // Replace with actual fee calculation

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Execute Flash Loan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!connected ? (
            <WalletConnect onConnect={() => connect()} />
          ) : (
            <>
              <Alert variant="default">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Flash loans must be repaid within the same transaction. Ensure
                  your contract implements the required interface.
                </AlertDescription>
              </Alert>

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
                <Label htmlFor="amount">Loan Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Flash Loan Fee: {flashLoanFee.toFixed(2)}%
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractAddress">Contract Address</Label>
                <Input
                  id="contractAddress"
                  placeholder="0x..."
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                />
              </div>

              <Button
                className="w-full"
                disabled={!amount || !selectedToken || !contractAddress}
                onClick={handleExecuteFlashLoan}
              >
                Execute Flash Loan
              </Button>

              <div className="text-sm text-muted-foreground">
                <a
                  href="https://calc1f4r.gitbook.io/arflash/specification/flashloan-reciever-specification"
                  className="text-primary hover:underline"
                >
                  View Flash Loan Documentation →
                </a>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <TransactionPreview
        amount={amount}
        token={selectedToken}
        fee={flashLoanFee}
      />
    </div>
  );
}
