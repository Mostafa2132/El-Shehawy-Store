"use client";

import { motion } from "framer-motion";
import { FiHeart, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-3xl border border-purple-500/20 text-center"
    >
      <div className="w-24 h-24 mb-6 rounded-full bg-slate-800 flex items-center justify-center border border-purple-500/30">
        <FiHeart className="w-10 h-10 text-gray-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-gray-400 max-w-md mx-auto mb-8">
        Explore our premium products and add your favorites here to buy them
        later.
      </p>
      <Link
        href="/products"
        className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 group"
      >
        <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Continue Shopping
      </Link>
    </motion.div>
  );
}
