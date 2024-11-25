import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Request Flash Loan",
    description:
      "Specify the amount and asset you want to borrow through our smart contract interface.",
  },
  {
    number: "02",
    title: "Execute Logic",
    description:
      "Implement your arbitrage or trading strategy within the same transaction.",
  },
  {
    number: "03",
    title: "Repay Loan",
    description:
      "Return the borrowed amount plus a small fee before the transaction completes.",
  },
];

export default function HowItWorks() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            How It Works
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Start using flash loans in minutes
          </p>
          <p className="mt-6 text-lg leading-8 text-foreground/60">
            Our protocol makes it easy to access flash loans through Arweave's
            actor-oriented smart contracts.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:gap-y-16">
            {steps.map((step) => (
              <div key={step.number} className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <div className="text-lg font-bold text-primary-foreground">
                      {step.number}
                    </div>
                  </div>
                  {step.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-foreground/60">
                  {step.description}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 flex justify-center">
            <Button size="lg" className="gap-2">
              Try It Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
