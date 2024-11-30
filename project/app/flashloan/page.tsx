import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiquidityInterface from "@/components/defi/liquidity-interface";
import FlashLoanInterface from "@/components/defi/flash-loan-interface";
import NetworkStatus from "@/components/defi/network-status";
import TransactionHistory from "@/components/defi/transaction-history";

export default function FlashLoanPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">DeFi Dashboard</h1>
        <NetworkStatus />
      </div>
      <Tabs defaultValue="liquidity" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="liquidity">Liquidity Provider</TabsTrigger>
          <TabsTrigger value="flashloan">Flash Loan</TabsTrigger>
        </TabsList>

        <TabsContent value="liquidity" className="space-y-8">
          <LiquidityInterface />
        </TabsContent>

        <TabsContent value="flashloan" className="space-y-8">
          <FlashLoanInterface />
        </TabsContent>
      </Tabs>
      {/* UI TO SHOW CASE THE TRANSACTION HISTORY */}
      {/* <div className="mt-12">
        <TransactionHistory />
      </div> */}
    </main>
  );
}
