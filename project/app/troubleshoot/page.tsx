import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConnectionChecker } from "@/components/defi/connection-checker";
import { AlertTriangle, BookOpen, Terminal, Wrench } from "lucide-react";

export default function TroubleshootPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Troubleshooting Guide</h1>
          <p className="text-muted-foreground">
            Use this guide to diagnose and resolve common issues when connecting
            to the flash loan protocol.
          </p>
        </div>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Before You Begin</AlertTitle>
          <AlertDescription>
            Ensure you have a Web3 wallet installed and are connected to the
            correct network (Arweave).
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Common Error Codes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-red-500">
                  WALLET_NOT_INSTALLED
                </h4>
                <p className="text-sm text-muted-foreground">
                  Web3 wallet not detected. Install MetaMask or another
                  compatible wallet.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-red-500">NETWORK_MISMATCH</h4>
                <p className="text-sm text-muted-foreground">
                  Connected to wrong network. Switch to Arweave network.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-red-500">CONTRACT_NOT_FOUND</h4>
                <p className="text-sm text-muted-foreground">
                  Flash loan contract not found at specified address.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Required Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">1. Wallet Configuration</h4>
                <p className="text-sm text-muted-foreground">
                  Configure your wallet to connect to Arweave network.
                </p>
              </div>
              <div>
                <h4 className="font-medium">2. Contract Implementation</h4>
                <p className="text-sm text-muted-foreground">
                  Implement required interfaces: executeOperation, onFlashLoan.
                </p>
              </div>
              <div>
                <h4 className="font-medium">3. Network Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Ensure correct RPC endpoint and chain ID configuration.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <ConnectionChecker contractAddress="0x..." />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Documentation</h4>
              <p className="text-sm text-muted-foreground">
                View our comprehensive documentation for detailed setup
                instructions.
              </p>
              <a
                href="/docs"
                className="text-primary hover:underline text-sm mt-1 inline-block">
                Read Documentation →
              </a>
            </div>
            <div>
              <h4 className="font-medium">Example Implementation</h4>
              <p className="text-sm text-muted-foreground">
                Check our GitHub repository for example contract
                implementations.
              </p>
              <a
                href="https://github.com/example/flash-loan-examples"
                className="text-primary hover:underline text-sm mt-1 inline-block">
                View Examples →
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
