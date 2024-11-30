interface TransactionPreviewProps {
  amount: string;
  token: string;
  fee: number;
}

export function TransactionPreview({
  amount,
  token,
  fee,
}: TransactionPreviewProps) {
  const estimatedGas = "0.002 ETH"; // Replace with actual gas estimation
  const totalFee = amount ? (Number(amount) * fee) / 100 : 0;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <h3 className="font-semibold mb-4">Transaction Preview</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span>{amount || "0"} {token}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Flash Loan Fee</span>
            <span>{totalFee.toFixed(4)} {token}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimated Gas</span>
            <span>{estimatedGas}</span>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{(Number(amount) + totalFee).toFixed(4)} {token}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}