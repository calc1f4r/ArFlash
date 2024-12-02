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
import {
  createDataItemSigner,
  dryrun,
  message,
  result,
} from "@permaweb/aoconnect";
import { ArflashAoId } from "@/constants/constants";
import { useEffect, useState } from "react";
import { useConnection } from "arweave-wallet-kit";
const data = [
  { name: "Jan", value: 1000 },
  { name: "Feb", value: 1200 },
  { name: "Mar", value: 1100 },
  { name: "Apr", value: 1400 },
  { name: "May", value: 1800 },
  { name: "Jun", value: 2000 },
];
import { useActiveAddress } from "arweave-wallet-kit";

export function LiquidityStats() {
  const { connected, connect, disconnect } = useConnection();
  const activeAddress = useActiveAddress();

  const [totalLiquidity, setTotalLiquidity] = useState(0);
  const [currentApy, setCurrentApy] = useState(0);
  const [rewardsEarned, setRewardsEarned] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (connected) {
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
        console.log(res.Messages[0].Tags[4].value);
        setTotalLiquidity(Number(res.Messages[0].Tags[4].value));
      }
    };
    fetchData();
  }, [connected]);

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
              <p className="text-2xl font-bold">${totalLiquidity.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current APY</p>
              <p className="text-2xl font-bold">{currentApy}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rewards Earned</p>
              <p className="text-2xl font-bold">${rewardsEarned.toFixed(2)}</p>
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
