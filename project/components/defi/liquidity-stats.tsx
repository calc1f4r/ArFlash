"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useConnection } from "arweave-wallet-kit";
const data = [
  { name: "Jan", value: 1000 },
  { name: "Feb", value: 1200 },
  { name: "Mar", value: 1100 },
  { name: "Apr", value: 1400 },
  { name: "May", value: 1800 },
  { name: "Jun", value: 2000 },
];

export function LiquidityStats() {
  const { connected, connect, disconnect } = useConnection();

  const totalLiquidity = connected ? "$2,000.00" : "$0.00";
  const currentApy = connected ? "5.67%" : "0%";
  const rewardsEarned = connected ? "$120.45" : "$0.00";
  const lockPeriod = connected ? "30 Days" : "0 Days";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Liquidity Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Liquidity</p>
              <p className="text-2xl font-bold">{totalLiquidity}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current APY</p>
              <p className="text-2xl font-bold">{currentApy}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rewards Earned</p>
              <p className="text-2xl font-bold">{rewardsEarned}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lock Period</p>
              <p className="text-2xl font-bold">{lockPeriod}</p>
            </div>
          </div>

          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
