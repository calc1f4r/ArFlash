"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { validateProtocolConnection, checkContractCompatibility } from '@/lib/utils/protocol';

interface CheckResult {
  name: string;
  status: 'success' | 'error' | 'warning' | 'pending';
  message: string;}

export function ConnectionChecker({ contractAddress }: { contractAddress: string }) {
  const [checks, setChecks] = useState<CheckResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const runChecks = async () => {
    setIsChecking(true);
    setChecks([]);

    // Check wallet connection
    const walletCheck: CheckResult = {
      name: 'Wallet Connection',
      status: 'pending',
      message: 'Checking wallet connection...'
    };
    setChecks(prev => [...prev, walletCheck]);

    try {
      if (typeof window.ethereum !== 'undefined') {
        walletCheck.status = 'success';
        walletCheck.message = 'Wallet detected and connected';
      } else {
        walletCheck.status = 'error';
        walletCheck.message = 'No Web3 wallet detected';
      }
    } catch (error) {
      walletCheck.status = 'error';
      walletCheck.message = 'Failed to check wallet connection';
    }

    setChecks(prev => [...prev.slice(0, -1), walletCheck]);

    // Check protocol connection
    const protocolCheck: CheckResult = {
      name: 'Protocol Connection',
      status: 'pending',
      message: 'Verifying protocol connection...'
    };
    setChecks(prev => [...prev, protocolCheck]);

    const protocolStatus = await validateProtocolConnection(contractAddress);
    if (protocolStatus.success) {
      protocolCheck.status = 'success';
      protocolCheck.message = 'Successfully connected to protocol';
    } else {
      protocolCheck.status = 'error';
      protocolCheck.message = protocolStatus.error || 'Failed to connect to protocol';
    }

    setChecks(prev => [...prev.slice(0, -1), protocolCheck]);

    // Check contract compatibility
    const contractCheck: CheckResult = {
      name: 'Contract Compatibility',
      status: 'pending',
      message: 'Checking contract compatibility...'
    };
    setChecks(prev => [...prev, contractCheck]);

    const compatibility = await checkContractCompatibility(contractAddress);
    if (compatibility.success) {
      contractCheck.status = 'success';
      contractCheck.message = 'Contract implements all required interfaces';
    } else {
      contractCheck.status = 'error';
      contractCheck.message = 'Contract missing required interfaces';
    }

    setChecks(prev => [...prev.slice(0, -1), contractCheck]);
    setIsChecking(false);
  };

  const getStatusIcon = (status: CheckResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500 animate-spin" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connection Checker</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={runChecks}
          disabled={isChecking}
          className="w-full mb-6"
        >
          Run Connection Checks
        </Button>

        <div className="space-y-4">
          {checks.map((check, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <h4 className="font-medium">{check.name}</h4>
                <p className="text-sm text-muted-foreground">{check.message}</p>
              </div>
              {getStatusIcon(check.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}