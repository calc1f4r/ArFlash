"use client";

import { use, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  createDataItemSigner,
  dryrun,
  message,
  result,
} from "@permaweb/aoconnect";
import { useActiveAddress } from "arweave-wallet-kit";
import { ArflashAoId, ArFakeUSDCAoId } from "@/constants/constants";
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
import { LiquidityStats } from "./liquidity-stats";
import { WalletConnect } from "./wallet-connect";
import { toast } from "sonner";
const supportedTokens = [
  {
    id: "ARUSDC",
    name: "ARUSDC",
    symbol: "ARUSDC",
    ao_id: ArFakeUSDCAoId,
  },
];

export default function LiquidityInterface() {
  const [userBalance, setUserBalance] = useState(0);
  const [selectedToken, setSelectedToken] = useState("");
  const [userAllowance, setUserAllowance] = useState(0);
  const activeAddress = useActiveAddress();

  async function fetchUserBalance() {
    try {
      let selectedTokenObj = supportedTokens.find(
        (token) => token.id === selectedToken
      );
      if (!selectedTokenObj) {
        selectedTokenObj = supportedTokens[0];
      }
      const res = await dryrun({
        process: selectedTokenObj.ao_id,
        tags: [
          { name: "Action", value: "Balance" },
          {
            name: "Target",
            value: activeAddress || "",
          },
        ],
        data: "",
        anchor: "1234",
        signer: createDataItemSigner(window.arweaveWallet),
      });

      setUserBalance(res.Messages[0].Tags[7].value);
    } catch (error) {
      console.error(error);
    }
  }

  const { connected, connect, disconnect } = useConnection();

  const [amount, setAmount] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    fetchUserBalance();
    fetchUserAllowance();
    console.log(userBalance);
    console.log(userAllowance);
  }, [selectedToken, amount, selectedToken]);

  async function fetchUserAllowance() {
    try {
      let selectedTokenObj = supportedTokens.find(
        (token) => token.id === selectedToken
      );
      if (!selectedTokenObj) {
        selectedTokenObj = supportedTokens[0];
      }
      const res = await message({
        process: selectedTokenObj.ao_id,
        tags: [
          { name: "Action", value: "Allowance" },
          {
            name: "Spender",
            value: ArflashAoId || "",
          },
        ],
        signer: createDataItemSigner(window.arweaveWallet),
      });

      const postResult = await result({
        process: ArFakeUSDCAoId,
        message: res,
      });
      setUserAllowance(postResult.Messages[0].Tags[5].value);
    } catch (error) {
      console.error(error);
    }
  }

  let changeAllowance = async (allowance: string) => {
    let selectedTokenObj = supportedTokens.find(
      (token) => token.id === selectedToken
    );
    if (!selectedTokenObj) {
      selectedTokenObj = supportedTokens[0];
    }

    const response = await message({
      process: ArFakeUSDCAoId,
      tags: [
        {
          name: "Action",
          value: "Approve",
        },
        {
          name: "Spender",
          value: ArflashAoId,
        },
        {
          name: "Quantity",
          value: allowance,
        },
      ],
      signer: createDataItemSigner(window.arweaveWallet),
    });
    const postResult = await result({
      process: ArFakeUSDCAoId,
      message: response,
    });
    console.log(postResult);
    toast.success("Tokens approved successfully");
  };
  const handleProvideLiquidity = async () => {
    try {
      console.log("Providing liquidity...");
      if (Number(amount) > userBalance) {
        toast.error("Insufficient balance!");
        return;
      }

      if (Number(amount) > Number(userAllowance)) {
        toast.info("Processing Transaction", {
          description: "Please wait while we process your transaction...",
        });
        await changeAllowance(amount);
      }

      const response = await message({
        process: ArflashAoId,
        tags: [
          {
            name: "Action",
            value: "AddLiquidity",
          },
          {
            name: "amount",
            value: amount,
          },
        ],
        signer: createDataItemSigner(window.arweaveWallet),
      });
      const postResult = await result({
        process: ArFakeUSDCAoId,
        message: response,
      });
      // toast.info("Processing Transaction");
      console.log(postResult);
      toast.success("Liquidity provided successfully");
    } catch (error) {
      toast.error("Failed to provide liquidity. Please try again.");
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
                {userAllowance >= Number(amount)
                  ? "Add liquidity"
                  : "Approve Tokens"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <LiquidityStats />
    </div>
  );
}
