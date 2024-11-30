"use client";

import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 backdrop-blur-lg bg-background/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Value Locked</p>
            <h3 className="text-2xl font-bold">$1,234,567</h3>
          </div>
          <ArrowUpRight className="w-6 h-6 text-emerald-500" />
        </div>
      </Card>

      <Card className="p-6 backdrop-blur-lg bg-background/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <h3 className="text-2xl font-bold">$890,123</h3>
          </div>
          <ArrowDownRight className="w-6 h-6 text-rose-500" />
        </div>
      </Card>

      <Card className="p-6 backdrop-blur-lg bg-background/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Active Loans</p>
            <h3 className="text-2xl font-bold">156</h3>
          </div>
          <Activity className="w-6 h-6 text-blue-500" />
        </div>
      </Card>
    </div>
  );
}
