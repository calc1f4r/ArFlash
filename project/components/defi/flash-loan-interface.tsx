"use client";

import { useState, useEffect } from "react";
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
import {
  createDataItemSigner,
  dryrun,
  message,
  result,
} from "@permaweb/aoconnect";
import { ArflashAoId, ArFakeUSDCAoId } from "@/constants/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { WalletConnect } from "./wallet-connect";
import { TransactionPreview } from "./transaction-preview";
import { useConnection, useActiveAddress } from "arweave-wallet-kit";
import { toast } from "sonner";

const supportedTokens = [
  {
    id: "ARUSDC",
    name: "ARUSDC",
    symbol: "ARUSDC",
    ao_id: ArFakeUSDCAoId,
  },
];

export default function FlashLoanInterface() {
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const { connected, connect, disconnect } = useConnection();
  const activeAddress = useActiveAddress();
  const [contractAddress, setContractAddress] = useState("");
  const [totalLiquidity, setTotalLiquidity] = useState(0);
  useEffect(() => {
    const fetchTotalLiquidity = async () => {
      if (connected) {
        const res = await dryrun({
          process: ArflashAoId,
          tags: [{ name: "Action", value: "TotalLiquidity" }],
          data: "",
          anchor: "1234",
          signer: createDataItemSigner(window.arweaveWallet),
        });
        if (res.Error) {
          console.error(res.Error);
        }
        console.log(res.Messages[0].Tags[4].value);
        setTotalLiquidity(Number(res.Messages[0].Tags[4].value));
      }
    };
    fetchTotalLiquidity();
  }, [amount, selectedToken]);
  const handleExecuteFlashLoan = async () => {
    try {
      if (Number(amount) > totalLiquidity) {
        toast.error("Insufficient balance!");
        return;
      }

      const response = await message({
        process: ArflashAoId,
        tags: [
          {
            name: "Action",
            value: "RequestLoan",
          },
          {
            name: "amount",
            value: amount,
          },
          {
            name: "receiver",
            value: contractAddress,
          },
        ],
        signer: createDataItemSigner(window.arweaveWallet),
      });
      toast.info("Processing Flash Loan", {
        description: "Please wait while we process your transaction...",
      });
      const postResult = await result({
        process: ArFakeUSDCAoId,
        message: response,
      });
      toast.success("Liquidity provided successfully");
    } catch (error) {
      toast.error("Failed to execute flash loan. Please try again.");
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
