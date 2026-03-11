"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist, useCart } from "@/context/StoreContext";
import { FiHeart } from "react-icons/fi";
import EmptyState from "@/Components/EmptyState/EmptyState";
import WishlistCard from "@/Components/WishlistCard/WishlistCard";

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
              My{" "}
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Wishlist
              </span>
            </h1>
            <p className="text-gray-400 mt-2">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>
        </motion.div>

        {/* EmptyState */}

        {wishlistItems.length === 0 ? (
          <EmptyState />
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
