import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="relative isolate">
      {/* Gradient background */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-foreground/60 ring-1 ring-foreground/10 hover:ring-foreground/20">
              Announcing our protocol launch.{" "}
              <a href="/announcement" className="font-semibold text-primary">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Flash Loans on{" "}
            <span className="text-primary">
              Arweave&apos;s Hyperparallel Network
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/60">
            Leverage Arweave&apos;s actor-oriented smart contracts for instant,
            secure, and efficient flash loans. Built for DeFi innovators and
            arbitrage traders.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Link href={"https://calc1f4r.gitbook.io/arflash/"}>
              <Button variant="outline" size="lg">
                Read Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
