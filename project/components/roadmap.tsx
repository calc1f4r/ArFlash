import { Milestone } from "lucide-react";

const milestones = [
  {
    quarter: "Q1 2024",
    title: "Protocol Launch",
    items: [
      "Mainnet deployment",
      "Security audits",
      "Initial liquidity pools",
      "Community governance setup",
    ],
  },
  {
    quarter: "Q2 2024",
    title: "Ecosystem Growth",
    items: [
      "Cross-chain integration",
      "Developer SDK release",
      "Partnership program",
      "Enhanced analytics dashboard",
    ],
  },
  {
    quarter: "Q3 2024",
    title: "Protocol Expansion",
    items: [
      "New asset pairs",
      "Advanced trading features",
      "Mobile app beta",
      "Institutional partnerships",
    ],
  },
  {
    quarter: "Q4 2024",
    title: "Enterprise Solutions",
    items: [
      "Enterprise API",
      "Institutional accounts",
      "Advanced risk management",
      "Global expansion",
    ],
  },
];

export default function Roadmap() {
  return (
    <div className="py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Roadmap
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Our Vision & Timeline
          </p>
          <p className="mt-6 text-lg leading-8 text-foreground/60">
            Follow our journey as we build the future of decentralized flash loans.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.quarter}
                className="relative pl-16 before:absolute before:left-6 before:top-0 before:h-full before:w-[2px] before:bg-border last:before:hidden"
              >
                <div className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Milestone className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-semibold text-primary">
                      {milestone.quarter}
                    </span>
                    <h3 className="text-xl font-bold">{milestone.title}</h3>
                  </div>
                  <ul className="space-y-2 text-foreground/60">
                    {milestone.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}