"use client";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiHome,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const quickLinks = [
    { name: "Home", href: "/", icon: FiHome },
    { name: "Products", href: "/products", icon: FiSearch },
    { name: "Categories", href: "/categories", icon: FiChevronRight },
    { name: "Contact", href: "/contact", icon: FiArrowRight },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-14 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-40 -right-96 w-96 h-96 bg-gradient-to-bl from-purple-600/10 to-transparent rounded-full blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-96 w-96 h-96 bg-gradient-to-tr from-cyan-600/10 to-transparent rounded-full blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl w-full text-center"
      >
        {/* 404 Number */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-8xl sm:text-9xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg mb-2">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-gray-500 text-sm">
            Don't worry, you can navigate back or explore our store below.
          </p>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          variants={itemVariants}
          className="mb-8 p-6 rounded-xl bg-slate-800/30 border border-purple-500/10 backdrop-blur-sm"
        >
          <p className="text-gray-400 mb-4">
            Looking for something? Try these popular sections:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              "Processors",
              "Graphics Cards",
              "Memory",
              "Storage",
              "Monitors",
              "Keyboards",
              "Mice",
              "Accessories",
            ].map((item) => (
              <Link
                key={item}
                href={`/products?search=${item.toLowerCase()}`}
                className="px-3 py-2 bg-slate-800/50 border border-purple-500/20 rounded-lg text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all text-sm"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          {/* Home Button */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 w-full"
            >
              <FiHome className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>

          {/* Browse Products */}
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800 border border-purple-500/30 text-white font-bold rounded-lg hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 w-full"
            >
              <FiSearch className="w-5 h-5" />
              Browse Products
            </motion.button>
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <p className="text-gray-400 font-semibold mb-4">Quick Navigation:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.name} href={link.href}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-purple-500/20 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </motion.button>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-purple-500/10"
        >
          <p className="text-gray-400">
            Still need help?{" "}
            <Link
              href="/contact"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Get in touch with our support team
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}