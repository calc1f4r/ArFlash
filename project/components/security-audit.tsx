import { Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const audits = [
  {
    firm: "Self-audited",
    date: "January 2024",
    score: "55/100",
    status: "Passed",
  },
];

const securityFeatures = [
  "Multi-signature governance",
  "Time-locked upgrades",
  "Emergency pause functionality",
  "Real-time monitoring",
  "Automated testing suite",
  "Formal verification",
];

export default function SecurityAudit() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Security First
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Battle-tested Security
          </p>
          <p className="mt-6 text-lg leading-8 text-foreground/60">
            Our protocol undergoes rigorous security audits and implements
            industry-leading safety measures.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Audits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {audits.map((audit) => (
                    <div
                      key={audit.firm}
                      className="flex items-center justify-between border-b pb-4 last:border-0"
                    >
                      <div>
                        <h4 className="font-semibold">{audit.firm}</h4>
                        <p className="text-sm text-foreground/60">
                          {audit.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">
                          {audit.score}
                        </p>
                        <p className="text-sm text-foreground/60">
                          {audit.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {securityFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-foreground/60"
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
