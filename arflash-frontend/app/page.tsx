"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useAnimation,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Shield,
  Droplets,
  Code,
  BookOpen,
  ArrowUpRight,
  Cpu,
  Network,
  Lock,
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
import Image from "next/image";

// Mock data for the chart
const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

function LandingPageComponent() {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const yPos = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }));
  }, [controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const floatingAnimation = {
    y: ["-10%", "10%"],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-black font-anime overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-white"
        style={{ opacity, scale, background: "linear-gradient(to bottom, #b3e5fc, #ffffff)" }}>
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: [
              "linear-gradient(120deg, #F9FAFB, #FFFFFF)",
              "linear-gradient(120deg, #F3F4F6, #FAFAFA)",
              "linear-gradient(120deg, #F1F5F9, #FFFFFF)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="relative z-10 text-center max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}>
            Infinite Liquidity. Lightning Speed.
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl mb-8 text-zinc-900 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}>
            Unlock the power of hyperparallel flashloans for seamless,
            verifiable liquidity across DeFi on Arweave AOS.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-400 to-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() =>
                (window.location.href = "https://calc1f4r.gitbook.io/arflash/")
              }>
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
        {/* <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={floatingAnimation}>
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Floating cryptocurrency coins"
            width={200}
            height={200}
            className="opacity-30"
          />
        </motion.div> */}
      </motion.section>

      {/* About the Protocol */}
      <motion.section
        className="py-20 px-4 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-6 text-blue-900"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            custom={0}>
            About the Protocol
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-zinc-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            custom={1}>
             Our flash loan protocol on Arweave's AOS (Arweave Operating System) harnesses the power of hyperparallel computing to deliver instant liquidity with secure, verifiable transactions. Built for modern DeFi needs, it maximizes performance without sacrificing transparency or trust.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <Image
              src="/aboutProtocol.png"
              alt="Arweave AOS Architecture"
              width={600}
              height={300}
              className="rounded-lg shadow-lg mx-auto border-4 border-pink-200"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Key Features */}
      <motion.section
        className="py-20 px-4 bg-blue-50"
        variants={staggerContainer}
        initial="hidden"
        animate="show">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-900 bg-gradient-to-r from-blue-200 to-blue-900 bg-clip-text text-transparent">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "Hyperparallel Processing",
              icon: Cpu,
              description:
                "Utilize AOS's hyperparallel contracts to process multiple transactions simultaneously, reducing wait times and boosting throughput.",
            },
            {
              title: "Verifiable Computation",
              icon: Shield,
              description:
                "Each transaction on AOS is self-auditing and secure, offering transparency and proof of authenticity in every operation.",
            },
            {
              title: "Max Liquidity",
              icon: Droplets,
              description:
                "Whether you're executing trades or providing liquidity, you can count on our system to deliver optimal performance.",
            },
            {
              title: "Instant Transactions",
              icon: ArrowRight,
              description:
                "Experience lightning-fast transaction speeds with our optimized protocol, ensuring your operations are executed in real-time.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible">
              <Card className="bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-blue-300 h-full transform hover:scale-105">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}>
                  <feature.icon className="w-12 h-12 mb-4 text-blue-700" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {feature.title}
                </h3>
                <p className="text-zinc-900">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-10 px-6 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-900">
          How It Works
        </h2>
        <div className="max-w-4xl mx-auto">
          <ol className="relative border-l border-blue-200">
            {[
              {
                title: "Step 1: Initiate the Loan Request",
                description:
                  "Begin by calling the requestLoan() function. This function requires specific parameters, including the process ID (aos process id) where you want to receive the loan and the desired loan amount. Ensure that your wallet is connected and compatible with the AOS network, as this integration allows for seamless access to flashloan features. This step is crucial for setting up the transaction and ensuring that all necessary information is provided.",
              },
              {
                title: " Token Approval and Receipt",
                description:
                  "Once the loan request is initiated, the process ID will approve the transfer of tokens to your specified account ID (ao.id). After the approval, the onloanreceived() function is automatically called to confirm the receipt of the tokens. In this handler itself you have to ensure that you are defining all the operations used.",
              },
              {
                title: "Execute the Transaction",
                description:
                  "With the tokens now in your account, you can execute the intended transaction. This may involve various operations such as self-liquidation, arbitrage, or other DeFi strategies. It is essential to act quickly and efficiently during this step to capitalize on market opportunities. The flexibility of flashloans allows you to leverage the borrowed funds for immediate trading or investment actions without the need for upfront capital.",
              },
              {
                title: "Repayment of the Loan",
                description:
                  "After successfully utilizing the loaned tokens, you must return them to the original process ID. This repayment includes any accrued interest or fees as stipulated in the loan agreement. Timely repayment is critical to maintaining trust within the DeFi ecosystem and avoiding penalties. Ensure that you have the necessary funds available to complete this step and finalize the transaction.",
              },
            ].map((step, index) => (
              <motion.li
                key={index}
                className="mb-10 ml-6"
                initial={{ opacity: 0, x: 50 }}
                animate={controls}
                custom={index}>
                <motion.span
                  className="absolute flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full -left-8 ring-4 ring-white text-white"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  {index + 1}
                </motion.span>
                <h3 className="ml-3 font-semibold text-xl mb-1 text-blue-900 mt-2">
                  {step.title}
                </h3>
                <p className="text-zinc-900">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}>
          <Image
            src="/Arflash.svg"
            alt="Flashloan process diagram"
            width={800}
            height={400}
            className="rounded-lg border-4 border-blue-100 shadow-lg mx-auto transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
          />
        </motion.div>
      </motion.section>

      {/* Use Cases & Applications */}
      <motion.section
        className="py-20 px-4 bg-blue-50"
        variants={staggerContainer}
        initial="hidden"
        animate="show">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-900">
          Use Cases & Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "DeFi Arbitrage",
              description:
                "Exploit price inefficiencies across decentralized exchanges without needing upfront capital, thanks to single-block flashloan execution.",
              link: "https://example.com/defi-arbitrage",
            },
            {
              title: "High-Frequency Trading (HFT)",
              description:
                "Enable automated, high-speed trading strategies that capitalize on small, rapid price movements across various DeFi platforms.",
              link: "https://example.com/high-frequency-trading",
            },
            {
              title: "Cross-Chain Operations",
              description:
                "Leverage hyperparallel processing for efficient multi-chain transfers, allowing seamless asset management across ecosystems.",
              link: "https://example.com/cross-chain-operations",
            },
            {
              title: "Yield Optimization",
              description:
                "Enhance returns on liquidity pools and other DeFi investments by temporarily increasing positions with flashloaned funds.",
              link: "https://example.com/yield-optimization",
            },
          ].map((useCase, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible">
              <Card className="bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 h-full transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {useCase.title}
                </h3>
                <p className="text-zinc-900 mb-4">{useCase.description}</p>
                <Button
                  variant="outline"
                  className="mt-auto group"
                  onClick={() =>
                    window.open(useCase.link, "_blank", "noopener noreferrer")
                  }>
                  Learn More
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Security and Trust */}
      <motion.section
        className="py-20 px-4 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-900">
            Security and Trust
          </h2>
          <motion.p
            className="text-lg sm:text-xl text-zinc-900 mb-8"
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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="show">
            {[
              {
                title: "Decentralized Verification",
                icon: Network,
                description:
                  "Self-verifying transactions enhance transparency, ensuring accountability in each interaction.",
              },
              {
                title: "Replay Protection",
                icon: Shield,
                description:
                  "Our protocol includes mechanisms to prevent replay attacks, ensuring each transaction is executed exactly once.",
              },
              {
                title: "Cross-Chain Security",
                icon: Lock,
                description:
                  "Our multi-chain compatibility incorporates additional safeguards for secure cross-chain operations.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="bg-blue-50 p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <feature.icon className="w-8 h-8 mb-2 text-blue-700" />
                  <h3 className="text-lg font-semibold mb-2 text-blue-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-900">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Analytics & Real-Time Data */}
      <motion.section
        className="py-20 px-4 bg-blue-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-900">
          Analytics & Real-Time Data
        </h2>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={controls}>
            <Card className="bg-white p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">
                Transaction Volume
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4B5563"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Documentation and Developer Resources */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white"
        variants={staggerContainer}
        initial="hidden"
        animate="show">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-900">
          Documentation and Developer Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Getting Started Guide",
              description:
                "Access our developer documentation to set up, configure, and deploy flashloan strategies on AOS.",
              link: "https://calc1f4r.gitbook.io/arflash/",
              icon: BookOpen,
            },
            {
              title: "API Documentation",
              description:
                "Explore our comprehensive API, designed for seamless integration and scalability, whether you're building DeFi products or personalizing your trading tools.",
              link: "https://calc1f4r.gitbook.io/arflash/",
              icon: Code,
            },
            {
              title: "Developer Support",
              description:
                "Join our community on GitHub and Discord to connect with other developers, share ideas, and troubleshoot with the AOS team.",
              link: "https://www.arweaveindia.com/",
              icon: Shield,
            },
          ].map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <Card className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:scale-105">
                  <IconComponent className="w-12 h-12 mb-4 text-blue-700" />
                  <h3 className="text-xl font-semibold mb-2 text-blue-900">
                    {resource.title}
                  </h3>
                  <p className="text-zinc-900 mb-4 flex-grow">
                    {resource.description}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-auto group"
                    onClick={() =>
                      window.open(
                        resource.link,
                        "_blank",
                        "noopener noreferrer"
                      )
                    }>
                    Explore
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-20 px-4 bg-blue-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-900">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {[
            {
              question: "What is AOS?",
              answer:
                "AOS (Arweave Operating System) is a decentralized platform that enables efficient and scalable applications, leveraging the power of blockchain technology.",
            },
            {
              question: "How do flashloans work?",
              answer:
                "Flashloans allow users to borrow assets without collateral, provided the loan is repaid within the same transaction. This enables various financial strategies in DeFi.",
            },
            {
              question: "What are the benefits of using flashloans?",
              answer:
                "Flashloans provide opportunities for arbitrage, liquidity provision, and other financial maneuvers without the need for upfront capital, making them a powerful tool in decentralized finance.",
            },
            {
              question: "Are flashloans safe to use?",
              answer:
                "While flashloans themselves are not inherently risky, they can be used in complex strategies that may expose users to market volatility and smart contract vulnerabilities.",
            },
            {
              question:
                "What types of transactions can I perform with flashloans?",
              answer:
                "Flashloans can be used for various purposes, including arbitrage, collateral swaps, and liquidity provision, allowing users to capitalize on market inefficiencies.",
            },
            {
              question: "How can I access flashloans on AOS?",
              answer:
                "To access flashloans on AOS, you need to follow the developer documentation which defines the way to access the flashloan functionality",
            },
            {
              question: "What are the fees associated with flashloans?",
              answer:
                "Flashloan fees vary by protocol but are generally a small percentage of the loan amount. It's important to check the specific terms of the protocol you are using. 0.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="mb-6 border-b border-blue-200 pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              custom={index}>
              <button
                className="flex justify-between items-center w-full text-left font-semibold text-lg mb-2 text-blue-900"
                onClick={() => setIsOpen(isOpen === index ? null : index)}>
                {faq.question}
                <motion.div
                  animate={{ rotate: isOpen === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}>
                  <ChevronDown className="text-zinc-900" />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden">
                    <p className="text-zinc-900 pl-4">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <footer className="bg-white py-8 px-4 border-t border-blue-200">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="text-zinc-900 mb-4 md:mb-0">
            © 2024 Arflash Protocol. All rights reserved.
          </div>
          <nav className="flex space-x-4">
            <a
              href="/about"
              className="text-zinc-900 hover:text-blue-900 transition-colors">
              About Us
            </a>
            <a
              href="#"
              className="text-zinc-900 hover:text-blue-900 transition-colors">
              Contact
            </a>
            <a
              href="#"
              className="text-zinc-900 hover:text-blue-900 transition-colors">
              Privacy Policy
            </a>
          </nav>
          <a
            href="https://github.com/calc1f4r/ArFlash"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-900 hover:text-blue-900 transition-colors">
            <Github className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPageComponent;
