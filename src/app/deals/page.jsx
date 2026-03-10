"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/Components/ProductCard/ProductCard";
import { FiClock, FiZap, FiTag, FiAlertTriangle } from "react-icons/fi";

export default function DealsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Fetch Deals (Random Products)
  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch(
          "https://electronics-store-api-two.vercel.app/api/products/random?count=15"
        );
        if (!response.ok) throw new Error("Failed to fetch deals");
        const data = await response.json();
        setProducts(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, []);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 }; // Reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen pt-32 pb-20 selection:bg-pink-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== HEADER SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl border border-pink-500/20 shadow-2xl relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full point-events-none" />

          <div className="flex items-center gap-5 z-10">
            <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg shadow-pink-500/30 animate-pulse">
              <FiZap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white flex items-center gap-3">
                Flash <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">Deals</span>
                <FiTag className="w-6 h-6 text-pink-500 hidden sm:block" />
              </h1>
              <p className="text-gray-400 mt-2 text-lg">
                Exclusive offers ending soon! Grab them before they're gone.
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-sm p-4 rounded-2xl border border-pink-500/30 shadow-lg z-10">
            <div className="flex items-center gap-2 text-pink-400 font-bold mr-2">
              <FiClock className="w-5 h-5 animate-pulse" />
              <span className="hidden sm:block">Ends in:</span>
            </div>
            <div className="flex gap-2 text-center">
              <div className="bg-slate-800 rounded-lg px-3 py-2 min-w-[3rem] border border-slate-700">
                <span className="block text-2xl font-black text-white">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Hrs</span>
              </div>
              <span className="text-2xl font-bold text-gray-600 pt-1">:</span>
              <div className="bg-slate-800 rounded-lg px-3 py-2 min-w-[3rem] border border-slate-700">
                <span className="block text-2xl font-black text-white">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Min</span>
              </div>
              <span className="text-2xl font-bold text-gray-600 pt-1">:</span>
              <div className="bg-slate-800 rounded-lg px-3 py-2 min-w-[3rem] border border-pink-500/30 text-pink-400 relative overflow-hidden group">
                <div className="absolute inset-0 bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors" />
                <span className="block text-2xl font-black relative z-10">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-pink-400/80 uppercase font-bold tracking-wider relative z-10">Sec</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== CONTENT SECTION ===== */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-2xl h-[400px] animate-pulse border border-slate-700"
              />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 bg-red-500/5 border border-red-500/20 rounded-3xl">
            <FiAlertTriangle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
