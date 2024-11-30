"use client";

import { Badge } from "@/components/ui/badge";

export default function NetworkStatus() {
  return (
    <div className="flex items-center space-x-2">
      <Badge variant="outline" className="p-2">
        Arweave Network
      </Badge>
      <span className="flex h-2 w-2 rounded-full bg-green-500" />
    </div>
  );
}
