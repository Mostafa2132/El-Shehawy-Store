"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import colorNameToHex from "@/Components/Colorutils/Colorutils";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
export default function WishlistCard({ product, index, onRemove, onMoveToCart  }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const colorHex = colorNameToHex(product.color);

  const imageUrl =
    product.imageUrl ||
    product.image ||
    "https://via.placeholder.com/400?text=No+Image";

  return (
    // WishlistCard
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500/20 overflow-hidden hover:border-pink-500/40 transition-all shadow-lg hover:shadow-pink-500/10 flex flex-col"
    >
      {/* Image Area */}
      <Link
        href={`/productDetails/${product.id}`}
        className="relative h-56 bg-slate-800 p-6 flex justify-center items-center overflow-hidden border-b border-purple-500/20 block"
      >
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className={`object-contain p-4 group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse" />
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex justify-between items-center gap-2">
          <Link href={`/productDetails/${product.id}`}>
            <h3 className="font-bold text-white text-lg line-clamp-2 hover:text-pink-400 transition-colors">
              {product.title}
            </h3>
          </Link>
          {/* Remove Button */}
          <button
            onClick={onRemove}
            className=" p-2  rounded-full bg-slate-900/80 backdrop-blur-sm border border-red-500/30 hover:bg-red-500 text-gray-400 hover:text-white transition-all duration-300 group/btn"
            title="Remove from wishlist"
          >
            <FiTrash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>

        <div className="flex items-center gap-4 mt-auto">
          <p className="font-black text-xl text-white">
            ${parseFloat(product.price).toFixed(2)}
          </p>
          {product.color && (
            <div
              className="w-4 h-4 rounded-full border border-gray-600 ml-auto"
              style={{ backgroundColor: colorHex }}
              title={product.color}
            />
          )}
        </div>

        <button
          onClick={onMoveToCart}
          className="mt-2 w-full py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-cyan-500 hover:to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-cyan-500/25 group/cart"
        >
          <FiShoppingCart className="w-4 h-4 group-hover/cart:-translate-x-1 transition-transform" />
          Move to Cart
        </button>
      </div>
    </motion.div>
  );
}