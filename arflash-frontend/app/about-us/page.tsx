"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-8">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 w-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded shadow-lg overflow-hidden border-4 border-blue-300 bg-blue-100 transition-transform duration-300">
            <Image
              src="/about-us.png"
              alt="About Us"
              width={400}
              height={400}
              className="rounded transition-transform duration-300"
            />
          </motion.div>
        </div>
        <div className="md:w-1/2 w-full md:pl-8 mt-6 md:mt-0">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">About Us</h2>
          <p className="text-zinc-900 mb-6">
            At Arflash Protocol, we are determined to change the face of DeFi by
            establishing hyperparallel flashloans on the platform of Arweave
            AOS. Our objective is to offer traders and developers effortless,
            safe, and efficient liquidity solutions. We work with the
            state-of-the-art technology and ideas of transparency as we strive
            to enhance our performance without creating a lack of trust.
            Additionally, we have our fee at 0.07% payable, with benevolent
            conditions for lenders and flashloan takers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
