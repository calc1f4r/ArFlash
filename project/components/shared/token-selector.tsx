"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TokenSelector() {
  return (
    <Select>
      <SelectTrigger className="w-full bg-background/50">
        <SelectValue placeholder="Select token" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ar">AR (Arweave)</SelectItem>
        <SelectItem value="usdc">USDC</SelectItem>
        <SelectItem value="eth">ETH</SelectItem>
      </SelectContent>
    </Select>
  );
}