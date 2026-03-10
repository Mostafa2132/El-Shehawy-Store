"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiClock,
  FiEye,
} from "react-icons/fi";
import Image from "next/image";
import colorNameToHex from "../Colorutils/Colorutils";
import Link from "next/link";
import { useCart, useWishlist } from "@/context/StoreContext";

export default function ProductCard({
  product,
  index,
  onAddToCart,
  onAddToWishlist,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const isWishlistedItem = isWishlisted(product?.id);

  // حساب الخصم
  const discount = product?.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  // البيانات الافتراضية
  const rating = product?.rating || 4.5;
  const reviews = product?.reviews || Math.floor(Math.random() * 500) + 50;
  const imageUrl =
    product?.imageUrl ||
    product?.image ||
    "https://via.placeholder.com/400?text=No+Image";
  const inStock = product?.inStock !== false;

  // معالجة الإعجاب
  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    onAddToWishlist?.(product);
  };

  // معالجة إضافة للسلة
  const handleAddCart = (e) => {
    e.preventDefault();
    addToCart(product);
    onAddToCart?.(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: (index || 0) * 0.05 }}
      whileHover={{ y: -10 }}
      className="group h-full flex flex-col"
    >
      <div className="relative flex-1 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 flex flex-col">
        {/* Badge Section */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          {discount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg font-bold text-white text-sm shadow-lg"
            >
              -{discount}%
            </motion.div>
          )}
          {product?.isNew && (
            <div className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold text-white text-sm flex items-center gap-1.5 shadow-lg">
              <FiClock className="w-4 h-4" />
              New
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWishlist}
            className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 hover:border-pink-500/60 transition-all duration-300 group-hover:bg-slate-900 hover:bg-pink-600/20"
          >
            <FiHeart
              className={`w-5 h-5 transition-all ${
                isWishlistedItem
                  ? "fill-pink-500 text-pink-500"
                  : "text-gray-400 hover:text-pink-400"
              }`}
            />
          </motion.button>

          {/* View Button */}
          <Link
            href={`/productDetails/${product?.id || ""}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 hover:border-cyan-500/60 transition-all duration-300 group-hover:bg-slate-900 hover:bg-cyan-600/20"
          >
            <FiEye className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
          </Link>
        </div>

        {/* Image Section */}
        <Link
          href={`/productDetails/${product?.id || ""}`}
          className="relative h-72 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden border-b border-purple-500/20 flex items-center justify-center flex-shrink-0"
        >
          <Image
            src={imageUrl}
            width={400}
            height={400}
            alt={product?.title || "Product"}
            priority={index < 4}
            quality={80}
            onLoadingComplete={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400?text=No+Image";
              setImageLoaded(true);
            }}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse" />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        </Link>

        {/* Content Section */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          {/* Category & Brand */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              {product?.category || "Accessories"}
            </span>
            {product?.brand && (
              <span className="text-xs font-medium text-gray-400 bg-slate-700/50 px-2.5 py-1 rounded-md truncate">
                {product.brand}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-white line-clamp-2 text-sm group-hover:text-cyan-400 transition-colors">
            {product?.title || "Untitled Product"}
          </h3>

          {/* Description */}
          {product?.description && (
            <p className="text-xs text-gray-400 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Model Year */}
          {product?.model && (
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <FiClock className="w-3 h-3" />
              Model {product.model}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : i - 0.5 < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              {rating.toFixed(1)} ({reviews})
            </span>
          </div>

          {/* Specs */}
          {product?.specs &&
            Array.isArray(product.specs) &&
            product.specs.length > 0 && (
              <div className="space-y-1 text-xs text-gray-400">
                {product.specs.slice(0, 2).map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5 flex-shrink-0">
                      •
                    </span>
                    <span className="line-clamp-1">{spec}</span>
                  </div>
                ))}
              </div>
            )}

          {/* Color Display */}
          {product?.color && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-gray-400">Color:</span>
              <div
                className="w-4 h-4 rounded-full border-2 border-gray-600 hover:border-cyan-400 transition-colors cursor-pointer flex-shrink-0"
                style={{ backgroundColor: colorNameToHex(product.color) }}
                title={product.color}
              />
              <span className="text-xs text-gray-400 truncate">
                {product.color}
              </span>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Price Section */}
          <div className="pt-4 border-t border-purple-500/20 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <p className="text-xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  ${parseFloat(product?.price || 0).toFixed(2)}
                </p>
                {product?.originalPrice && (
                  <p className="text-xs text-gray-500 line-through">
                    ${parseFloat(product.originalPrice).toFixed(2)}
                  </p>
                )}
              </div>
              {inStock && (
                <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg whitespace-nowrap">
                  In Stock
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddCart}
              disabled={!inStock}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 group text-sm"
            >
              <FiShoppingCart className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
