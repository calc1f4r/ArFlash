"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Shield,
  Zap,
  Droplets,
  Gauge,
  BarChart2,
  Code,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for the chart
const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }));
  }, [controls]);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: [
              "linear-gradient(120deg, #E0F2FE, #EEF2FF)",
              "linear-gradient(120deg, #DBEAFE, #E0E7FF)",
              "linear-gradient(120deg, #BFDBFE, #C7D2FE)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="relative z-10 text-center max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            Infinite Liquidity. Lightning Speed.
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Unlock the power of hyperparallel flashloans for seamless,
            verifiable liquidity across DeFi on Arweave AOS.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Flashloan <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </section>

      {/* About the Protocol */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            custom={0}>
            About the Protocol
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            custom={1}>
            Our flashloan protocol on Arweave's AOS (AssemblyScript on Steroids)
            harnesses the power of hyperparallel computing to deliver instant
            liquidity with secure, verifiable transactions. Built for modern
            DeFi needs, it maximizes performance without sacrificing
            transparency or trust.
          </motion.p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "Hyperparallel Processing",
              icon: Zap,
              description:
                "Utilize AOS's hyperparallel technology to process multiple transactions simultaneously, reducing wait times and boosting throughput.",
            },
            {
              title: "Verifiable Computation",
              icon: Shield,
              description:
                "Each transaction on AOS is self-auditing and secure, offering transparency and proof of authenticity in every operation.",
            },
            {
              title: "Flexible Loan Terms",
              icon: Droplets,
              description:
                "Our protocol's design lets you configure custom loan parameters tailored to your trading strategies, enhancing control over each transaction.",
            },
            {
              title: "Gas Optimization",
              icon: Gauge,
              description:
                "AOS's framework optimizes every transaction for minimal gas usage, cutting costs and improving efficiency, especially in high-frequency scenarios.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              custom={index}>
              <Card className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <feature.icon className="w-12 h-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          How It Works
        </h2>
        <div className="max-w-4xl mx-auto">
          <ol className="relative border-l border-gray-200">
            {[
              {
                title: "Connect Wallet",
                description:
                  "Integrate any compatible wallet to seamlessly access flashloan features.",
              },
              {
                title: "Define Loan Parameters",
                description:
                  "Set up flashloan specifics—amount, terms, and duration—to customize your transaction.",
              },
              {
                title: "Execute Transaction",
                description:
                  "Hyperparallel processing kicks in, executing transactions with industry-leading speed and security.",
              },
              {
                title: "Repayment Process",
                description:
                  "Complete the transaction in the allotted timeframe to close the flashloan cycle, with no hidden fees.",
              },
            ].map((step, index) => (
              <motion.li
                key={index}
                className="mb-10 ml-6"
                initial={{ opacity: 0, x: -50 }}
                animate={controls}
                custom={index}>
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full -left-4 ring-4 ring-white text-white">
                  {index + 1}
                </span>
                <h3 className="font-semibold text-xl mb-1 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Use Cases & Applications */}
      <section className="py-20 px-4 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Use Cases & Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "DeFi Arbitrage",
              description:
                "Exploit price inefficiencies across decentralized exchanges without needing upfront capital, thanks to single-block flashloan execution.",
            },
            {
              title: "High-Frequency Trading (HFT)",
              description:
                "Enable automated, high-speed trading strategies that capitalize on small, rapid price movements across various DeFi platforms.",
            },
            {
              title: "Cross-Chain Operations",
              description:
                "Leverage hyperparallel processing for efficient multi-chain transfers, allowing seamless asset management across ecosystems.",
            },
            {
              title: "Yield Optimization",
              description:
                "Enhance returns on liquidity pools and other DeFi investments by temporarily increasing positions with flashloaned funds.",
            },
          ].map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              custom={index}>
              <Card className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <Button variant="outline" className="mt-auto">
                  Learn More <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security and Trust */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900">
            Security and Trust
          </h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}>
            Security is at the core of our protocol. With AOS's built-in
            verifiable computation and actor-oriented message passing, every
            transaction undergoes rigorous checks for accuracy. By leveraging
            decentralized data storage on Arweave, we ensure that your assets
            remain safe, whether operating in low-risk or high-frequency trading
            environments. All transactions are designed to be gas-efficient and
            resistant to common vulnerabilities.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Decentralized Verification",
                description:
                  "Self-verifying transactions enhance transparency, ensuring accountability in each interaction.",
              },
              {
                title: "Replay Protection",
                description:
                  "Our protocol includes mechanisms to prevent replay attacks, ensuring each transaction is executed exactly once.",
              },
              {
                title: "Cross-Chain Security",
                description:
                  "Our multi-chain compatibility incorporates additional safeguards for secure cross-chain operations.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                custom={index}>
                <Card className="bg-gray-50 p-4 shadow hover:shadow-md transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics & Real-Time Data */}
      <section className="py-20 px-4 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Analytics & Real-Time Data
        </h2>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={controls}>
            <Card className="bg-white p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Transaction Volume
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Documentation and Developer Resources */}
      <section className="py-20 px-4 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Documentation and Developer Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Getting Started Guide",
              icon: BookOpen,
              description:
                "Access our developer documentation to set up, configure, and deploy flashloan strategies on AOS.",
            },
            {
              title: "API Documentation",
              icon: Code,
              description:
                "Explore our comprehensive API, designed for seamless integration and scalability, whether you are building DeFi products or personalizing your trading tools.",
            },
            {
              title: "Developer Support",
              icon: Github,
              description:
                "Join our community on GitHub and Discord to connect with other developers, share ideas, and troubleshoot with the AOS team.",
            },
          ].map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              custom={index}>
              <Card className="bg-gray-50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <resource.icon className="w-12 h-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {resource.description}
                </p>
                <Button variant="outline" className="mt-auto">
                  Explore <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {[
            {
              question: "What is a flashloan?",
              answer:
                "A flashloan is an uncollateralized loan that must be repaid within the same transaction. It's a powerful tool for traders and DeFi users.",
            },
            {
              question: "Why choose AOS flashloans?",
              answer:
                "Our protocol's hyperparallel processing and verifiable computation make flashloans faster, more scalable, and gas-efficient on Arweave AOS.",
            },
            {
              question: "What are the gas fees like?",
              answer:
                "Our protocol is optimized for minimal gas usage, lowering transaction costs, especially during high-frequency operations.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="mb-6 border-b border-gray-200 pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              custom={index}>
              <button
                className="flex justify-between items-center w-full text-left font-semibold text-lg mb-2 text-gray-900"
                onClick={() => setIsOpen(isOpen === index ? null : index)}>
                {faq.question}
                <ChevronDown
                  className={`transform transition-transform ${
                    isOpen === index ? "rotate-180" : ""
                  } text-blue-600`}
                />
              </button>
              {isOpen === index && (
                <motion.p
                  className="text-gray-600 pl-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}>
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            © 2024 Arflash Protocol. All rights reserved.
          </div>
          <nav className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors">
              About Us
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
          </nav>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors">
            <Github className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}
