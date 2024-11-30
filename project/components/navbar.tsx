"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { ConnectButton } from "arweave-wallet-kit";
const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Docs", href: "https://calc1f4r.gitbook.io/arflash/" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Zap className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold">ArFlash</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href)
                    ? "text-primary font-semibold"
                    : "text-foreground/60 hover:text-foreground"
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
            {pathname !== "/flashloan" && (
              <Button onClick={() => (window.location.href = "/flashloan")}>
                Launch App
              </Button>
            )}
            <ConnectButton profileModal={false} showBalance={true} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-foreground/60 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-background border-b">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href)
                    ? "text-primary font-semibold"
                    : "text-foreground/60"
                } block px-3 py-2 rounded-md text-base font-medium hover:text-foreground transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <Button
              className="w-full mt-2"
              onClick={() => (window.location.href = "/flashloan")}
            >
              Launch App
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
