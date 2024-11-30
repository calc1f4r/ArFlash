"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

const transactions = [
  {
    id: "1",
    type: "Flash Loan",
    amount: "1000",
    token: "ETH",
    status: "Completed",
    timestamp: new Date(2024, 1, 15),
  },
  {
    id: "2",
    type: "Provide Liquidity",
    amount: "5000",
    token: "USDC",
    status: "Completed",
    timestamp: new Date(2024, 1, 14),
  },
  // Add more transaction history items
];

export default function TransactionHistory() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Transaction History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.token}</TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell>
                {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
