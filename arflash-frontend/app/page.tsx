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
  Gauge,
  BarChart2,
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
        style={{ opacity, scale }}>
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
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 text-blue-800"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}>
            Infinite Liquidity. Lightning Speed.
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl mb-8 text-blue-600 max-w-3xl mx-auto"
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
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
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
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={floatingAnimation}>
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Floating cryptocurrency coins"
            width={200}
            height={200}
            className="opacity-30"
          />
        </motion.div>
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
            className="text-lg sm:text-xl text-blue-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            custom={1}>
            Our flashloan protocol on Arweave's AOS (AssemblyScript on Steroids)
            harnesses the power of hyperparallel computing to deliver instant
            liquidity with secure, verifiable transactions. Built for modern
            DeFi needs, it maximizes performance without sacrificing
            transparency or trust.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="Arweave AOS Architecture"
              width={600}
              height={300}
              className="rounded-lg shadow-lg mx-auto"
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
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-900">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "Hyperparallel Processing",
              icon: Cpu,
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
              variants={cardVariants}
              initial="hidden"
              animate="visible">
              <Card className="bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 h-full transform hover:scale-105">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}>
                  <feature.icon className="w-12 h-12 mb-4 text-blue-700" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {feature.title}
                </h3>
                <p className="text-blue-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-20 px-4 bg-white"
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
                <motion.span
                  className="absolute flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full -left-4 ring-4 ring-white text-white"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  {index + 1}
                </motion.span>
                <h3 className="font-semibold text-xl mb-1 text-blue-900">
                  {step.title}
                </h3>
                <p className="text-blue-600">{step.description}</p>
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
            src="/placeholder.svg?height=400&width=800"
            alt="Flashloan process diagram"
            width={800}
            height={400}
            className="rounded-lg shadow-lg mx-auto"
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
              variants={cardVariants}
              initial="hidden"
              animate="visible">
              <Card className="bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 h-full transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {useCase.title}
                </h3>
                <p className="text-blue-600 mb-4">{useCase.description}</p>
                <Button variant="outline" className="mt-auto group">
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
            className="text-lg sm:text-xl text-blue-600 mb-8"
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
                  <p className="text-sm text-blue-600">{feature.description}</p>
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
              icon: BookOpen,
              description:
                "Access our developer documentation to set up, configure, and deploy flashloan strategies on AOS.",
            },
            {
              title: "API Documentation",
              icon: Code,
              description:
                "Explore our comprehensive API, designed for seamless integration and scalability, whether you're building DeFi products or personalizing your trading tools.",
            },
            {
              title: "Developer Support",
              icon: Github,
              description:
                "Join our community on GitHub and Discord to connect with other developers, share ideas, and troubleshoot with the AOS team.",
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
                  <p className="text-blue-600 mb-4 flex-grow">
                    {resource.description}
                  </p>
                  <Button variant="outline" className="mt-auto group">
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
                  <ChevronDown className="text-blue-600" />
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
                    <p className="text-blue-600 pl-4">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-white py-8 px-4 border-t border-blue-200">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="text-blue-600 mb-4 md:mb-0">
            © 2024 Arflash Protocol. All rights reserved.
          </div>
          <nav className="flex space-x-4">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-900 transition-colors">
              About Us
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-900 transition-colors">
              Contact
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-900 transition-colors">
              Privacy Policy
            </a>
          </nav>
          <a
            href="https://github.com/calc1f4r/ArFlash"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-900 transition-colors">
            <Github className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPageComponent;
