import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const partners = [
  {
    name: "Arweave",
    role: "Infrastructure Partner",
    logo: "https://cryptologos.cc/logos/arweave-ar-logo.png",
  },
  {
    name: "Chainlink",
    role: "Oracle Provider",
    logo: "https://cryptologos.cc/logos/chainlink-link-logo.png",
  },
  {
    name: "Uniswap",
    role: "DEX Partner",
    logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
  },
  {
    name: "Aave",
    role: "Lending Partner",
    logo: "https://cryptologos.cc/logos/aave-aave-logo.png",
  },
];

export default function Partners() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Partnerships
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by Industry Leaders
          </p>
          <p className="mt-6 text-lg leading-8 text-foreground/60">
            We collaborate with the best in the industry to provide secure and
            efficient flash loan services.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <Card key={partner.name} className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="relative h-16 w-16 mb-4">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{partner.name}</h3>
                  <p className="text-sm text-foreground/60">{partner.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}