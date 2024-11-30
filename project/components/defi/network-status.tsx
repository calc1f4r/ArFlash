"use client";

import { Badge } from "@/components/ui/badge";

export default function NetworkStatus() {
  return (
    <div className="flex items-center space-x-2">
      <Badge variant="secondary" className="p-2">
        Arweave
      </Badge>
      <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse" />
    </div>
  );
}
