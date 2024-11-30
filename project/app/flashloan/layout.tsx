import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArFlash - DeFi Dashboard",
  description:
    "Access flash loans and provide liquidity on Arweave's actor-oriented hyperparallel contracts",
};

export default function FlashLoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
