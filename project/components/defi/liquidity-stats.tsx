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

const data = [
  { name: "Jan", value: 1000 },
  { name: "Feb", value: 1200 },
  { name: "Mar", value: 1100 },
  { name: "Apr", value: 1400 },
  { name: "May", value: 1800 },
  { name: "Jun", value: 2000 },
];

export function LiquidityStats() {
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
              <p className="text-2xl font-bold">$2,000.00</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current APY</p>
              <p className="text-2xl font-bold">5.67%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rewards Earned</p>
              <p className="text-2xl font-bold">$120.45</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lock Period</p>
              <p className="text-2xl font-bold">30 Days</p>
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