"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/StoreContext";
import { toast } from "react-toastify";
import {
  FiShoppingCart,
  FiArrowRight,
  FiTag,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaCcAmex,
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
} from "react-icons/fa";
import EmptyState from "@/Components/EmptyState/EmptyState";
import CartItem from "@/Components/CartItem/CartItem";

export default function CartPage() {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Derived totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 && subtotal < 500 ? 25 : 0; // Free shipping over 500
  const discountAmount = subtotal * appliedDiscount;
  const total = subtotal + shipping - discountAmount;

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!discountCode.trim()) return;

    const code = discountCode.toUpperCase();
    if (code === "TECH20") {
      setAppliedDiscount(0.2);
      toast.success("20% Discount Applied! 🎉", { theme: "dark" });
    } else if (code === "WELCOME10") {
      setAppliedDiscount(0.1);
      toast.success("10% Discount Applied! 🚀", { theme: "dark" });
    } else {
      setAppliedDiscount(0);
      toast.error("Invalid or expired code", { theme: "dark" });
    }
  };

  const handleUpdateQuantity = (product, change) => {
    const newQty = product.quantity + change;
    if (newQty < 1) return;

    // We reuse addToCart since it just adds to existing quantity in Context
    // Wait, the StoreContext addToCart function *adds* the quantity.
    // If I want to change it to exact quantity, I need to pass the *difference*.
    addToCart({ ...product, quantity: change });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-32 pb-20 selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center gap-4"
        >
          <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
            <FiShoppingCart className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white">
              Shopping{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Cart
              </span>
            </h1>
            <p className="text-gray-400 mt-2">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>
        </motion.div>

        {cartItems.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Cart Items */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    index={index}
                    onUpdateQty={(change) => handleUpdateQuantity(item, change)}
                    onRemove={() => removeFromCart(item.id)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Right: Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4"
            >
              <div className="sticky top-28 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl border border-purple-500/20 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Estimated Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-green-400 font-medium">Free</span>
                    ) : (
                      <span className="text-white font-medium">
                        ${shipping.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-pink-400 font-medium bg-pink-500/10 p-2 rounded-lg -mx-2 px-2">
                      <span>
                        Discount ({(appliedDiscount * 100).toFixed(0)}%)
                      </span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-6" />

                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg text-white font-bold">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">VAT included</p>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCode} className="mb-8 group">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
                    Promo Code
                  </label>
                  <div className="relative flex">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiTag className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="TECH20"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="w-full pl-10 pr-20 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all uppercase"
                    />
                    <button
                      type="submit"
                      disabled={!discountCode.trim()}
                      className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center"
                    >
                      Apply
                    </button>
                  </div>
                </form>

                {/* Checkout Button */}
                <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black text-lg rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Proceed to Checkout
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </button>

                <div className="mt-4 flex flex-wrap justify-center gap-3 opacity-60">
                  <span className="text-xs text-gray-400">
                    Secure checkout powered by
                  </span>
                  <FiCheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">Stripe</span>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-3 opacity-60">
                  <FaCcMastercard className="w-6 h-6 text-red-400" />
                  <FaCcVisa className="w-6 h-6 text-cyan-400" />
                  <FaCcAmex className="w-6 h-6 text-blue-400" />
                  <FaCcDiscover className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
