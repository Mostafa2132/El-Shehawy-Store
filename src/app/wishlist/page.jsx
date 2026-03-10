"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useWishlist, useCart } from "@/context/StoreContext";
import colorNameToHex from "@/Components/Colorutils/Colorutils";
import {
  FiTrash2,
  FiShoppingCart,
  FiArrowRight,
  FiHeart,
  FiArrowLeft,
} from "react-icons/fi";

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product); // Remove from wishlist
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-32 pb-20 selection:bg-pink-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center gap-4"
        >
          <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/20">
            <FiHeart className="w-8 h-8 text-pink-400 fill-pink-400" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white">
              My <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Wishlist</span>
            </h1>
            <p className="text-gray-400 mt-2">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-3xl border border-purple-500/20 text-center"
          >
            <div className="w-24 h-24 mb-6 rounded-full bg-slate-800 flex items-center justify-center border border-purple-500/30">
              <FiHeart className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Explore our premium products and add your favorites here to buy them later.
            </p>
            <Link
              href="/products"
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 group"
            >
              <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {wishlistItems.map((product, idx) => (
                <WishlistCard 
                  key={product.id} 
                  product={product} 
                  index={idx}
                  onRemove={() => toggleWishlist(product)}
                  onMoveToCart={() => handleMoveToCart(product)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function WishlistCard({ product, index, onRemove, onMoveToCart }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const colorHex = colorNameToHex(product.color);
  
  const imageUrl = product.imageUrl || product.image || "https://via.placeholder.com/400?text=No+Image";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500/20 overflow-hidden hover:border-pink-500/40 transition-all shadow-lg hover:shadow-pink-500/10 flex flex-col"
    >
      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-900/80 backdrop-blur-sm border border-red-500/30 hover:bg-red-500 text-gray-400 hover:text-white transition-all duration-300 group/btn"
        title="Remove from wishlist"
      >
        <FiTrash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
      </button>

      {/* Image Area */}
      <Link href={`/productDetails/${product.id}`} className="relative h-56 bg-slate-800 p-6 flex justify-center items-center overflow-hidden border-b border-purple-500/20 block">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className={`object-contain p-4 group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse" />
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex justify-between items-start gap-2">
          <Link href={`/productDetails/${product.id}`}>
            <h3 className="font-bold text-white text-lg line-clamp-2 hover:text-pink-400 transition-colors">
              {product.title}
            </h3>
          </Link>
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
