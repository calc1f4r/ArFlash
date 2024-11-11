'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white text-blue-900">
      {/* Hero Section */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-900">About Us</h1>
          <p className="text-lg sm:text-xl text-blue-600 mb-8">
            At ArFlash Protocol, we are dedicated to revolutionizing decentralized finance through hyperparallel flashloans on Arweave's AOS platform. Our team of experts leverages cutting-edge technology to deliver instant liquidity with unparalleled speed and security.
          </p>
          <p className="text-lg sm:text-xl text-blue-600 mb-8">
            Founded in 2024, our mission is to empower traders and developers by providing seamless access to verifiable, high-performance flashloan services that drive innovation in the DeFi space.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            Get in Touch
          </Button>
        </div>
      </motion.section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-900">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example Team Member */}
            <Card className="bg-blue-50 p-6 shadow-md transition-all duration-300 transform hover:scale-105">
              <img src="/placeholder.svg?height=150&width=150" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-blue-900 text-center">Alex Johnson</h3>
              <p className="text-blue-600 text-center">Chief Executive Officer</p>
            </Card>
            {/* Add more team members as needed */}
            {/* ... */}
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-blue-900">Our Mission & Vision</h2>
          <p className="text-lg sm:text-xl text-blue-600 mb-6">
            Our mission is to provide innovative, efficient, and secure financial solutions that empower individuals and businesses in the decentralized economy.
          </p>
          <p className="text-lg sm:text-xl text-blue-600">
            We envision a future where financial systems are accessible, transparent, and decentralized, fostering global economic growth and inclusivity.
          </p>
        </div>
      </section>
    </div>
  )
}

export default AboutUsPage
