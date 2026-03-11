"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "@/Components/ProductCard/ProductCard";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function SimilarProducts({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [splideInstance, setSplideInstance] = useState(null);

  useEffect(() => {
    if (!productId) return;
    async function fetchSimilar() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://electronics-store-api-two.vercel.app/api/products/similar/${productId}`
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.results)) {
          setProducts(data.results);
        }
      } catch (err) {
        console.error("Failed to fetch similar products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSimilar();
  }, [productId]);

  if (!loading && products.length === 0) return null;

  return (
    <section className="bg-slate-950 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between mb-8 gap-4"
      >
        <div>
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
            You May Also Like
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Similar{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => splideInstance?.go("<")}
            className="p-2.5 rounded-full bg-slate-800/80 border border-purple-500/20 hover:border-cyan-500/40 text-gray-400 hover:text-cyan-400 transition-all duration-300"
          >
            <FiChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => splideInstance?.go(">")}
            className="p-2.5 rounded-full bg-slate-800/80 border border-purple-500/20 hover:border-cyan-500/40 text-gray-400 hover:text-cyan-400 transition-all duration-300"
          >
            <FiChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Slider */}
      {loading ? (
        /* Skeleton — matching ProductCard shape */
        <div className="flex gap-5 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 overflow-hidden animate-pulse"
            >
              <div className="h-72 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-slate-700 rounded w-1/3" />
                <div className="h-4 bg-slate-700 rounded w-4/5" />
                <div className="h-3 bg-slate-700 rounded w-3/5" />
                <div className="h-px bg-purple-500/20 mt-4" />
                <div className="h-9 bg-slate-700 rounded-lg mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Splide
            onMounted={(splide) => setSplideInstance(splide)}
            options={{
              type: "slide",
              perPage: 4,
              perMove: 1,
              gap: "1.25rem",
              pagination: false,
              arrows: false,
              speed: 400,
              easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              drag: true,
              breakpoints: {
                1280: { perPage: 4 },
                1024: { perPage: 3 },
                768: { perPage: 2 },
                640: { perPage: 1 },
              },
            }}
            className="w-full"
          >
            {products.map((product, index) => (
              <SplideSlide key={product.id} className="flex">
                <div className="w-full h-full">
                  <ProductCard product={product} index={index} />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}
    </section>
  );
}
