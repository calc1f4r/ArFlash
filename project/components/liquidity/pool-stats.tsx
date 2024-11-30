"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function PoolStats() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon">
          <Info className="h-4 w-4" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Pool Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">APY</p>
              <p className="text-sm font-medium">12.5%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Deposits</p>
              <p className="text-sm font-medium">$1.2M</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Utilization</p>
              <p className="text-sm font-medium">76%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Providers</p>
              <p className="text-sm font-medium">245</p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
