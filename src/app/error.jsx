"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiRefreshCw,
  FiHome,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error occurred:", error);
  }, [error]);

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

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-40 -right-96 w-96 h-96 bg-gradient-to-bl from-red-600/10 to-transparent rounded-full blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-96 w-96 h-96 bg-gradient-to-tr from-red-600/10 to-transparent rounded-full blur-3xl"
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
        {/* Error Icon */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center"
            >
              <FiAlertTriangle className="w-12 h-12 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl sm:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              Oops!
            </span>
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-400 text-lg mb-4">
            We encountered an unexpected error. Please try again or contact
            support if the problem persists.
          </p>
        </motion.div>

        {/* Error Details */}
        {error && (
          <motion.div
            variants={itemVariants}
            className="mb-8 p-6 rounded-xl bg-red-500/10 border border-red-500/30 text-left"
          >
            <p className="text-red-400 text-sm font-mono break-words">
              <span className="font-bold">Error:</span> {error.message}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          {/* Retry Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => reset()}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
          >
            <FiRefreshCw className="w-5 h-5" />
            Try Again
          </motion.button>

          {/* Home Button */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800 border border-purple-500/30 text-white font-bold rounded-lg hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 w-full"
            >
              <FiHome className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>

        {/* Help Section */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl bg-slate-800/30 border border-purple-500/10 backdrop-blur-sm"
        >
          <h3 className="text-white font-bold mb-4">What you can do:</h3>
          <ul className="text-gray-400 space-y-2 text-sm text-left">
            {[
              "Refresh the page and try again",
              "Clear your browser cache and cookies",
              "Check your internet connection",
              "Try using a different browser",
              "Contact our support team for assistance",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <FiChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Support Link */}
        <motion.div variants={itemVariants} className="mt-8">
          <p className="text-gray-400">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Contact our support team
            </Link>
          </p>
        </motion.div>

        {/* Error Code */}
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-8 border-t border-purple-500/10"
        >
          <p className="text-gray-600 text-xs">
            Error ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}