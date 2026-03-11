"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import colorNameToHex from "@/Components/Colorutils/Colorutils";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export default function CartItem({ item, index, onUpdateQty, onRemove }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const colorHex = colorNameToHex(item.color);
  const imageUrl =
    item.imageUrl ||
    item.image ||
    "https://via.placeholder.com/400?text=No+Image";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.95,
        filter: "blur(5px)",
        transition: { duration: 0.2 },
      }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-slate-900/40 rounded-2xl border border-purple-500/10 p-3 sm:p-4 hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all group"
    >
      {/* Image */}
      <Link
        href={`/productDetails/${item.id}`}
        className="relative h-32 w-full sm:w-32 bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
      >
        <Image
          src={imageUrl}
          alt={item.title}
          fill
          className={`object-contain p-2 group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-1 justify-between gap-3 sm:gap-0">
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1 block">
              {item.category || "Electronics"}
            </span>
            <Link href={`/productDetails/${item.id}`}>
              <h3 className="text-white font-bold text-lg hover:text-cyan-400 transition-colors line-clamp-2 leading-tight">
                {item.title}
              </h3>
            </Link>
          </div>
          <button
            onClick={onRemove}
            className="p-2 text-gray-500 hover:text-red-400 bg-slate-800 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
            title="Remove item"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          {item.color && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-purple-500/20">
              <span
                className="w-2.5 h-2.5 rounded-full border border-gray-600 block"
                style={{ backgroundColor: colorHex }}
              />
              <span className="text-xs">{item.color}</span>
            </div>
          )}
          {item.model && (
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-purple-500/20 text-xs">
              {item.model}
            </span>
          )}
        </div>

        <div className="flex justify-between items-end mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center bg-slate-950 border border-purple-500/30 rounded-lg p-1">
            <button
              onClick={() => onUpdateQty(-1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-white text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQty(1)}
              disabled={item.quantity >= 10}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-xl font-black text-white">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-gray-500">
                ${parseFloat(item.price).toFixed(2)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}