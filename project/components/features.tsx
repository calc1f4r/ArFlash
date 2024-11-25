import {
  Zap,
  Shield,
  Cpu,
  BarChart3,
  Lock,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    name: "Instant Liquidity",
    description:
      "Access large amounts of liquidity instantly without collateral requirements.",
    icon: Zap,
  },
  {
    name: "Hyperparallel Execution",
    description:
      "Leverage Arweave's actor-oriented contracts for parallel transaction processing.",
    icon: Cpu,
  },
  {
    name: "Enhanced Security",
    description:
      "Built on Arweave's secure and permanent blockchain infrastructure.",
    icon: Shield,
  },
  {
    name: "Real-time Analytics",
    description:
      "Monitor protocol metrics, loan volumes, and market opportunities in real-time.",
    icon: BarChart3,
  },
  {
    name: "Atomic Transactions",
    description:
      "All-or-nothing execution ensures your flash loans are risk-free.",
    icon: Lock,
  },
  {
    name: "Automated Arbitrage",
    description:
      "Built-in tools for identifying and executing arbitrage opportunities.",
    icon: RefreshCw,
  },
];

export default function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Powerful Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for flash loans on Arweave
          </p>
          <p className="mt-6 text-lg leading-8 text-foreground/60">
            Our protocol combines the power of Arweave's permanent storage with
            advanced DeFi capabilities to provide a seamless flash loan experience.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-foreground/60">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}