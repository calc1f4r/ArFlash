"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TokenSelector } from "@/components/shared/token-selector";
import { PoolStats } from "@/components/liquidity/pool-stats";
import { toast } from "sonner";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export function LiquidityPanel() {
  const [aoId, setAoId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSupply = () => {
    toast.success("Supply successful", {
      description: "Your liquidity has been added to the pool",
    });
  };

  return (
    <Card className="p-6 backdrop-blur-lg bg-background/30">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Provide Liquidity</h2>
          <PoolStats />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aoId">
              AO.ID
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="inline-block w-4 h-4 ml-2 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>Your Arweave Ownership ID</TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="aoId"
              value={aoId}
              onChange={(e) => setAoId(e.target.value)}
              placeholder="Enter your AO.ID"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Token</Label>
            <TokenSelector />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="bg-background/50"
              />
              <div className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                ≈ $0.00
              </div>
            </div>
          </div>

          <Button
            onClick={handleSupply}
            className="w-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:opacity-90"
          >
            Supply
          </Button>
        </div>
      </div>
    </Card>
  );
}
