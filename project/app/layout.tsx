import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArFlash - Arweave Flashloan Protocol",
  description:
    "Decentralized flashloans on Arweave's actor-oriented hyperparallel contracts",
  openGraph: {
    url: "https://github.com/calc1f4r/ArFlash",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <ArweaveWalletKit
            config={{
              permissions: [
                "ACCESS_ADDRESS",
                "ACCESS_PUBLIC_KEY",
                "SIGN_TRANSACTION",
                "DISPATCH",
                "SIGNATURE",
              ],
              ensurePermissions: true,
            }}>
            <Toaster richColors />
            <Navbar />
            {children}
            <Footer />
          </ArweaveWalletKit>
        </ThemeProvider>
      </body>
    </html>
  );
}
