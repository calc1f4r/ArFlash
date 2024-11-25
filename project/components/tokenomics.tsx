import { PieChart, DollarSign, Users, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tokenomics = [
  {
    title: "Protocol Revenue",
    description: "0.1% fee on flash loans",
    icon: DollarSign,
    color: "text-chart-1",
  },
  {
    title: "Token Distribution",
    description: "Community-focused allocation",
    icon: Users,
    color: "text-chart-2",
  },
  {
    title: "Token Utility",
    description: "Governance and fee sharing",
    icon: PieChart,
    color: "text-chart-3",
  },
  {
    title: "Vesting Schedule",
    description: "Linear vesting over 2 years",
    icon: Lock,
    color: "text-chart-4",
  },
];

export default function Tokenomics() {
  return (
    <div className="py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Tokenomics
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Sustainable Token Economics
          </p>
          <p className="mt-6 text-lg leading-8 text-foreground/60">
            Our token model is designed for long-term sustainability and
            community alignment.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {tokenomics.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 lg:mt-24">
            <Card>
              <CardHeader>
                <CardTitle>Token Allocation</CardTitle>
                <CardDescription>
                  Total Supply: 100,000,000 ARFL
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Community Treasury</span>
                        <span>40%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-chart-1 h-2 rounded-full"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Team & Advisors</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-chart-2 h-2 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Ecosystem Growth</span>
                        <span>25%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-chart-3 h-2 rounded-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Initial Liquidity</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-chart-4 h-2 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Vesting Schedule</h4>
                    <ul className="space-y-2 text-sm text-foreground/60">
                      <li>• Community Treasury: 4-year linear vesting</li>
                      <li>
                        • Team & Advisors: 2-year linear vesting, 6-month cliff
                      </li>
                      <li>• Ecosystem Growth: Released based on milestones</li>
                      <li>• Initial Liquidity: Locked for 1 year</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
