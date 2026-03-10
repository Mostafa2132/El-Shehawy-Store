"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import colorNameToHex from "@/Components/Colorutils/Colorutils";
import SimilarProducts from "@/Components/SimilarProducts/SimilarProducts";
import { useCart, useWishlist } from "@/context/StoreContext";
import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiClock,
  FiChevronRight,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiMinus,
  FiPlus,
  FiCheck,
  FiAlertTriangle,
} from "react-icons/fi";

export default function ProductDetails({ params }) {
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://electronics-store-api-two.vercel.app/api/products/${id}`,
        );
        if (!res.ok) throw new Error(`Product not found (${res.status})`);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  // ===== Loading State =====
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-5">
        {/* Spinner matching ProductCard's border color scheme */}
        <div className="w-14 h-14 rounded-full border-4 border-slate-800 border-t-cyan-500 animate-spin" />
        <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest animate-pulse">
          Loading Product...
        </p>
      </div>
    );
  }

  // ===== Error State =====
  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
          <FiAlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
        </div>
        <h2 className="text-3xl font-black text-white">Oops!</h2>
        <p className="text-slate-400 max-w-sm">
          {error || "Product not found."}
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // ===== Derived Values (same logic as ProductCard) =====
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;
  const rating = product.rating || 4.5;
  const reviews = product.reviews || 328;
  const inStock = product.inStock !== false;
  const imageUrl =
    product.imageUrl ||
    product.image ||
    "https://via.placeholder.com/400?text=No+Image";
  const colorHex = colorNameToHex(product.color);

  const handleQuantity = (type) => {
    if (type === "inc" && quantity < 10) setQuantity((q) => q + 1);
    if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30">
      <div className="pt-32 py-10 px-4 sm:px-6 lg:px-8">
        {/* ===== Breadcrumb ===== */}
        <div className="max-w-7xl mx-auto mb-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 flex-wrap">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <FiChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-cyan-400 font-semibold uppercase text-xs tracking-wider">
              {product.category || "Electronics"}
            </span>
            <FiChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-slate-300 truncate max-w-xs">
              {product.title}
            </span>
          </nav>
        </div>

        {/* ===== Main Grid ===== */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ===== LEFT: Image Panel ===== */}
          {/* Matches ProductCard: from-slate-800 to-slate-900, border-purple-500/20, rounded-2xl */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            <div className="relative group aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 flex items-center justify-center p-6">
              {/* Badges — same as ProductCard */}
              <div className="absolute top-4 left-4 z-20 flex gap-2 flex-wrap">
                {discount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg font-bold text-white text-sm shadow-lg"
                  >
                    -{discount}%
                  </motion.div>
                )}
                {product.isNew && (
                  <div className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold text-white text-sm flex items-center gap-1.5 shadow-lg">
                    <FiClock className="w-4 h-4" />
                    New
                  </div>
                )}
              </div>

              {/* Wishlist button top-right — same style as ProductCard */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 hover:border-pink-500/60 transition-all duration-300 hover:bg-pink-600/20"
              >
                <FiHeart
                  className={`w-5 h-5 transition-all ${
                    isWishlisted(product?.id)
                      ? "fill-pink-500 text-pink-500"
                      : "text-gray-400 hover:text-pink-400"
                  }`}
                />
              </button>

              {/* Product Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.35 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={imageUrl}
                    alt={product.title || "Product"}
                    fill
                    priority
                    className={`object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-2xl ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoadingComplete={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400?text=No+Image";
                      setImageLoaded(true);
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Shimmer placeholder — same as ProductCard */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse rounded-2xl" />
              )}

              {/* Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
            </div>
          </motion.div>

          {/* ===== RIGHT: Info Panel ===== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-lg p-6 flex flex-col gap-5"
          >
            {/* Category + Rating — same text styles as ProductCard */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                {product.category || "Electronics"}
              </span>
              <div className="flex items-center gap-1 bg-slate-800/60 px-3 py-1 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">
                  {rating.toFixed(1)} ({reviews})
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
              {product.title}
            </h1>

            {/* Model */}
            {product.model && (
              <div className="text-sm text-gray-500 flex items-center gap-1.5">
                <FiClock className="w-3.5 h-3.5" />
                Model: <span className="text-slate-300">{product.model}</span>
              </div>
            )}

            {/* Price — matching ProductCard gradient */}
            <div className="flex items-end gap-4 py-3 border-y border-purple-500/20">
              <p className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                ${parseFloat(product.price || 0).toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-lg text-gray-500 line-through mb-0.5">
                  ${parseFloat(product.originalPrice).toFixed(2)}
                </p>
              )}
              {inStock ? (
                <span className="ml-auto text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  In Stock
                </span>
              ) : (
                <span className="ml-auto text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-lg whitespace-nowrap">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-400 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Color swatch */}
            {product.color && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-purple-500/20">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  Color:
                </span>
                <div
                  className="w-6 h-6 rounded-full border-2 border-cyan-400 shadow-lg flex-shrink-0"
                  style={{ backgroundColor: colorHex }}
                  title={product.color}
                />
                <span className="text-sm text-slate-300 font-medium">
                  {product.color}
                </span>
                <FiCheck className="w-4 h-4 text-cyan-400 ml-auto" />
              </div>
            )}

            {/* Quantity + Add to Cart — same button style as ProductCard */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Quantity */}
              <div className="flex items-center justify-between bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-xl px-4 py-3 sm:w-36">
                <button
                  onClick={() => handleQuantity("dec")}
                  disabled={quantity <= 1}
                  className="text-gray-400 hover:text-cyan-400 transition-colors disabled:opacity-30"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="font-bold text-white text-lg w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantity("inc")}
                  disabled={quantity >= 10}
                  className="text-gray-400 hover:text-cyan-400 transition-colors disabled:opacity-30"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart — same exact gradient as ProductCard */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inStock}
                onClick={() => addToCart({ ...product, quantity })}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 group"
              >
                <FiShoppingCart className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                {inStock
                  ? `Add to Cart — $${(product.price * quantity).toFixed(2)}`
                  : "Out of Stock"}
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: FiTruck, label: "Free Shipping", sub: "Over $50" },
                {
                  icon: FiRotateCcw,
                  label: "30-Day Returns",
                  sub: "Hassle-free",
                },
                {
                  icon: FiShield,
                  label: "2 Yr Warranty",
                  sub: "Buyer protection",
                },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-800/40 border border-purple-500/20 hover:border-cyan-500/30 transition-colors text-center"
                >
                  <Icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-200">
                    {label}
                  </span>
                  <span className="text-[10px] text-slate-500">{sub}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>

      {/* Similar Products Slider */}
      <SimilarProducts productId={id} />
    </div>
  );
}
