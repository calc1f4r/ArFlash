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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [removeAmount, setRemoveAmount] = useState("");
  const [removeTermsAccepted, setRemoveTermsAccepted] = useState(false);
  const [removeSelectedToken, setRemoveSelectedToken] = useState("");
  const [userLiquidity, setUserLiquidity] = useState(0);
  async function fetchUserBalance() {
    try {
      let selectedTokenObj = supportedTokens.find(
        (token) => token.id === selectedToken,
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
  }, [selectedToken, amount]);

  useEffect(() => {
    fetchUserLiquidity();
  }, [removeSelectedToken, removeAmount]);
  async function fetchUserAllowance() {
    try {
      let selectedTokenObj = supportedTokens.find(
        (token) => token.id === selectedToken,
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

  async function fetchUserLiquidity() {
    try {
      console.log("Fetching user liquidity...");
      const res = await dryrun({
        process: ArflashAoId,
        tags: [
          { name: "Action", value: "Liquidity" },
          {
            name: "Target",
            value: activeAddress || "",
          },
        ],
        data: "",
        anchor: "1234",
        signer: createDataItemSigner(window.arweaveWallet),
      });
      if (res.Error) {
        console.error(res.Error);
      }
      console.log(res);
      setUserLiquidity(res.Messages[0].Tags[5].value);
    } catch (error) {
      console.error(error);
    }
  }

  let changeAllowance = async (allowance: string) => {
    let selectedTokenObj = supportedTokens.find(
      (token) => token.id === selectedToken,
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

        toast.success("Tokens approved successfully");
      } else {
        const response = await message({
          process: ArflashAoId,
          tags: [
            {
              name: "Action",
              value: "addLiquidity",
            },
            {
              name: "amount",
              value: amount,
            },
          ],
          signer: createDataItemSigner(window.arweaveWallet),
        });

        toast.info("Your transaction is being processed. Please wait...");

        const postResult = await result({
          process: ArFakeUSDCAoId,
          message: response,
        });
        toast.success("Liquidity provided successfully");
      }
    } catch (error) {
      toast.error("Failed to provide liquidity. Please try again.");
    }
  };

  const handleRemoveLiquidity = async () => {
    try {
      console.log("Removing liquidity...");
      if (Number(removeAmount) <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      if (Number(removeAmount) > userLiquidity) {
        toast.error("Insufficient liquidity!");
        return;
      }
      let selectedTokenObj = supportedTokens.find(
        (token) => token.id === removeSelectedToken,
      );
      if (!selectedTokenObj) {
        selectedTokenObj = supportedTokens[0];
      }

      // Send message to smart contract to remove liquidity
      const response = await message({
        process: ArflashAoId,
        tags: [
          {
            name: "Action",
            value: "RemoveLiquidity",
          },
          {
            name: "Amount",
            value: removeAmount,
          },
        ],
        signer: createDataItemSigner(window.arweaveWallet),
      });

      toast.info("Your transaction is being processed. Please wait...");

      const postResult = await result({
        process: ArflashAoId,
        message: response,
      });

      toast.success("Liquidity removed successfully");

      // Update user's balance and liquidity stats if necessary
    } catch (error) {
      toast.error("Failed to remove liquidity. Please try again.");
    }
  };

  const estimatedApy = 5.67; // Replace with real APY calculation

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Tabs defaultValue="provide" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="provide">Provide Liquidity</TabsTrigger>
          <TabsTrigger value="remove">Remove Liquidity</TabsTrigger>
        </TabsList>

        <TabsContent value="provide">
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
                    <Select
                      value={selectedToken}
                      onValueChange={setSelectedToken}
                    >
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
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I accept the terms and conditions
                    </label>
                  </div>

                  <Button
                    className="w-full"
                    disabled={!amount || !selectedToken || !termsAccepted}
                    onClick={handleProvideLiquidity}
                  >
                    {userAllowance >= Number(amount)
                      ? "Add liquidity"
                      : "Approve Tokens"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="remove">
          <Card>
            <CardHeader>
              <CardTitle>Remove Liquidity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!connected ? (
                <WalletConnect onConnect={() => connect()} />
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="remove-token">Select Token</Label>
                    <Select
                      value={removeSelectedToken}
                      onValueChange={setRemoveSelectedToken}
                    >
                      <SelectTrigger id="remove-token">
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
                    <Label htmlFor="remove-amount">Amount</Label>
                    <Input
                      id="remove-amount"
                      type="number"
                      placeholder="0.0"
                      value={removeAmount}
                      onChange={(e) => setRemoveAmount(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remove-terms"
                      checked={removeTermsAccepted}
                      onCheckedChange={(checked) =>
                        setRemoveTermsAccepted(!!checked)
                      }
                    />
                    <label
                      htmlFor="remove-terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I accept the terms and conditions
                    </label>
                  </div>

                  <Button
                    className="w-full"
                    disabled={
                      !removeAmount ||
                      !removeTermsAccepted ||
                      !removeSelectedToken
                    }
                    onClick={handleRemoveLiquidity}
                  >
                    Remove Liquidity
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <LiquidityStats />
    </div>
  );
}
