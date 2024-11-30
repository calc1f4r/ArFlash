"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export function TransactionHistory() {
  const transactions = [
    {
      id: "1",
      type: "Flash Loan",
      amount: "1,000 AR",
      timestamp: "2024-01-20 14:30",
      status: "Completed",
    },
    {
      id: "2",
      type: "Provide Liquidity",
      amount: "500 AR",
      timestamp: "2024-01-20 13:15",
      status: "Completed",
    },
  ];

  return (
    <Card className="p-6 backdrop-blur-lg bg-background/30">
      <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.timestamp}</TableCell>
              <TableCell>{tx.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
