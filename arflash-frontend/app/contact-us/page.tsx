"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-4 text-blue-900">Contact Us</h2>
        <p className="text-zinc-900 mb-6">
          We'd love to hear from you! Please fill out the form below or reach out to us at <a href="mailto:contact@arflashprotocol.com" className="text-blue-600">contact@arflashprotocol.com</a>.
        </p>
        <form>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-zinc-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-zinc-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Message Field */}
          <div className="mb-6">
            <label className="block text-zinc-700 text-sm font-bold mb-2">Message</label>
            <textarea
              placeholder="Your message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            ></textarea>
          </div>
          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUsPage;
