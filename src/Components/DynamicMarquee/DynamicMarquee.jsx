"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { FiChevronRight, FiChevronLeft, FiLoader } from "react-icons/fi";
import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

// Mapping for category names (English)
const CATEGORY_NAMES = {
  cpu: "Processors (CPU)",
  gpu: "Graphics Cards (GPU)",
  ram: "Memory (RAM)",
  motherboard: "Motherboards",
  storage: "Storage Devices",
  screen: "Monitors",
  case: "Computer Cases",
  mouse: "Mice",
  keyboard: "Keyboards",
  speakers: "Speakers",
  printers: "Printers",
  laptops: "Laptops",
  accessories: "Accessories",
};

export default function DynamicMarquee({ category, initialProducts = null }) {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState(null);
  const [splideInstance, setSplideInstance] = useState(null);

  const API_BASE = "https://electronics-store-api-two.vercel.app/api";
  const categoryTitle = CATEGORY_NAMES[category] || category;

  // Fetch products
  useEffect(() => {
    // If we already have products from SSR, don't fetch again
    if (initialProducts) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/products/category/${category}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const productsList = Array.isArray(data.results)
          ? data.results
          : Array.isArray(data.products)
            ? data.products
            : [];
        setProducts(productsList);
      } catch (err) {
       
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, initialProducts]);

  if (error) return <Error/>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-8 px-4 sm:px-6 lg:px-8 w-full"
    >
      {/* Header with Title and Navigation */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 "
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {categoryTitle}
            </span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
        </motion.div>

        {/* Buttons Section - Top Right */}
        <div className="flex gap-3 flex-shrink-0">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => splideInstance?.go("<")}
            className="p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center flex-shrink-0"
            aria-label="Previous products"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => splideInstance?.go(">")}
            className="p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center flex-shrink-0"
            aria-label="Next products"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* View All Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`/products?category=${category}`}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hidden sm:inline-block whitespace-nowrap text-sm sm:text-base"
          >
            View All
          </motion.a>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center py-32">
          <p className="text-gray-400 text-lg">No products available</p>
        </div>
      ) : (
        <div className="w-full rounded-xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-purple-500/10 backdrop-blur-sm">
          <Splide
            onMounted={(splide) => setSplideInstance(splide)}
            options={{
              type: "slide",
              perPage: 5,
              perMove: 1,
              gap: "1.5rem",
              pagination: false,
              arrows: false,
              padding: { left: "1.5rem", right: "1.5rem" },
              speed: 400,
              easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              drag: true,
              rewind: true,
              clones:
                products.length > 0
                  ? Math.ceil(5 / Math.min(products.length, 5)) *
                    Math.min(products.length, 5)
                  : 0,
              breakpoints: {
                1536: {
                  perPage: 4,
                  padding: { left: "1.5rem", right: "1.5rem" },
                  gap: "1.5rem",
                },
                1280: {
                  perPage: 4,
                  padding: { left: "1.5rem", right: "1.5rem" },
                  gap: "1.5rem",
                },
                1024: {
                  perPage: 3,
                  padding: { left: "1.5rem", right: "1.5rem" },
                  gap: "1.5rem",
                },
                768: {
                  perPage: 2,
                  padding: { left: "1rem", right: "1rem" },
                  gap: "1rem",
                },
                640: {
                  perPage: 1,
                  padding: { left: "0.5rem", right: "0.5rem" },
                  gap: "0.75rem",
                },
              },
            }}
            className="splide-marquee w-full"
          >
            {products.map((product, index) => (
              <SplideSlide
                key={product.id || index}
                className="flex !flex-shrink-0"
              >
                <div className="w-full h-full">
                  <ProductCard product={product} index={index} />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}
    </motion.section>
  );
}
