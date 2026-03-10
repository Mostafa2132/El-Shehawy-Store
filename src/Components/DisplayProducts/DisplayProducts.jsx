"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFilter,
  FiSearch,
  FiClock,
  FiDollarSign,
  FiTag,
  FiX,
  FiLoader,
  FiAlertCircle,
  FiRefreshCw,
  FiDatabase,
  FiBarChart2,
} from "react-icons/fi";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";
import SimpleErorr from "../SimpleErorr/SimpleErorr";

export default function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [apiInfo, setApiInfo] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [previousPage, setPreviousPage] = useState(1);
  const itemsPerPage = 12;

  const API_BASE = "https://electronics-store-api-two.vercel.app/api";

  // الفئات المتاحة من الـ API
  const AVAILABLE_CATEGORIES = [
    "cpu",
    "gpu",
    "ram",
    "motherboard",
    "storage",
    "screen",
    "case",
    "mouse",
    "keyboard",
    "speakers",
    "printers",
    "laptops",
    "accessories",
  ];

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories(AVAILABLE_CATEGORIES);
      }
    };
    fetchCategories();
  }, []);

  // Fetch statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/stats`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  // دالة للحصول على URL مع pagination parameters
  const getFetchUrl = (pageNum = 1) => {
    // إذا كان هناك بحث، استخدم endpoint البحث المتقدم
    if (searchTerm && searchTerm.trim()) {
      let url = `${API_BASE}/products/search?q=${encodeURIComponent(searchTerm)}`;
      if (selectedCategory !== "all") {
        url += `&category=${selectedCategory}`;
      }
      url += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
      url += `&page=${pageNum}&limit=${itemsPerPage}`;
      return url;
    }

    // إذا كانت هناك فئة محددة، استخدم endpoint الفئة
    if (selectedCategory !== "all") {
      return `${API_BASE}/products/category/${selectedCategory.toLowerCase()}?page=${pageNum}&limit=${itemsPerPage}`;
    }

    // خلاف ذلك، احصل على جميع المنتجات
    return `${API_BASE}/products/all?page=${pageNum}&limit=${itemsPerPage}`;
  };

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = getFetchUrl(page);
        console.log("Fetching from:", url);

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`API Error: ${res.statusText}`);
        }

        const data = await res.json();

        // حفظ معلومات API
        if (data.info) {
          setApiInfo(data.info);
        }

        // التعامل مع بيانات API - قد تكون results أو products
        let allProducts = Array.isArray(data.results)
          ? data.results
          : Array.isArray(data.products)
            ? data.products
            : [];

        if (allProducts.length === 0) {
          setFilteredProducts([]);
          return;
        }

        // تطبيق فلتر نطاق السعر
        let filtered = allProducts.filter((p) => {
          const price = parseFloat(p.price) || 0;
          return price >= priceRange[0] && price <= priceRange[1];
        });

        // تطبيق الترتيب محلياً
        filtered = applySorting(filtered, sortBy);

        setFilteredProducts(filtered);

        // Scroll smooth فقط عند تغيير الصفحة يدوياً (ليس في التحميل الأولي)
        // تحقق إذا كانت الصفحة قد تغيرت من قبل
        if (!isInitialLoad && page !== previousPage) {
          setTimeout(() => {
            const productsSection = document.querySelector(".products-section");
            if (productsSection) {
              productsSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }, 100);
        }

        // حدّث الصفحة السابقة
        setPreviousPage(page);

        // بعد أول تحميل، علم أن التحميلات القادمة ليست أولية
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.message);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // تأخير طفيف للبحث لتقليل الطلبات
    const searchDelay = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(searchDelay);
  }, [selectedCategory, searchTerm, priceRange, sortBy, page]);

  // دالة الترتيب المحلية
  const applySorting = (items, sortType) => {
    const sorted = [...items];
    switch (sortType) {
      case "price-low":
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price-high":
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "newest":
        return sorted.sort((a, b) => (b.model || 0) - (a.model || 0));
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "featured":
      default:
        return sorted;
    }
  };

  // استخدام عدد الصفحات من API إذا كان متوفراً
  const totalPages = apiInfo?.totalPages || 1;

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("featured");
    setPriceRange([0, 10000]);
    setPage(1);
  };

  const handleRefresh = async () => {
    setLoading(true);
    const url = getFetchUrl(page);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to refresh");
      const data = await res.json();

      if (data.info) {
        setApiInfo(data.info);
      }

      const allProducts = Array.isArray(data.results)
        ? data.results
        : Array.isArray(data.products)
          ? data.products
          : [];

      setFilteredProducts(allProducts);
    } catch (err) {
      setError("Failed to refresh products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-40 -right-96 w-96 h-96 bg-gradient-to-bl from-cyan-600/10 to-transparent rounded-full blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-96 w-96 h-96 bg-gradient-to-tr from-purple-600/10 to-transparent rounded-full blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-black mb-4">
            <span className="text-white">Browse Our</span>
            <span className="block bg-gradient-to-r pb-2 from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Premium Catalog
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Discover {filteredProducts.length} amazing products from top brands
            {apiInfo?.totalProducts &&
              ` (${apiInfo.totalProducts} total in store)`}
          </p>

          {/* API Info Stats */}
          {apiInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-wrap justify-center gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 backdrop-blur-sm hover:border-cyan-500/60 transition-all"
              >
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <FiDatabase className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-cyan-400">
                    {apiInfo.totalProducts}
                  </span>
                  <span>Total Products</span>
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-5 py-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/40 backdrop-blur-sm hover:border-purple-500/60 transition-all"
              >
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <FiBarChart2 className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold text-purple-400">
                    {apiInfo.totalPages}
                  </span>
                  <span>Pages</span>
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-5 py-3 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/40 backdrop-blur-sm hover:border-orange-500/60 transition-all"
              >
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <FiTag className="w-4 h-4 text-orange-400" />
                  <span className="font-semibold text-orange-400">
                    {apiInfo.productsOnPage}
                  </span>
                  <span>Per Page</span>
                </p>
              </motion.div>

              {apiInfo.currentPage && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/40 backdrop-blur-sm hover:border-green-500/60 transition-all"
                >
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <FiClock className="w-4 h-4 text-green-400" />
                    <span>Page</span>
                    <span className="font-semibold text-green-400">
                      {apiInfo.currentPage}
                    </span>
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Error Message */}
      {error && <SimpleErorr error={error} />}

      {/* Search & Filter Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <motion.input
              type="text"
              placeholder="Search products by name, brand, or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-12 py-4 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            />
            {searchTerm && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm("");
                  setPage(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 cursor-pointer appearance-none bg-no-repeat pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%239ca3af' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "16px 12px",
                paddingRight: "2.5rem",
              }}
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories && categories.length > 0
                ? categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </option>
                  ))
                : null}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 cursor-pointer appearance-none bg-no-repeat pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%239ca3af' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "16px 12px",
                paddingRight: "2.5rem",
              }}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Price Range Display */}
            <div className="px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white flex items-center gap-2">
              <FiDollarSign className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span className="text-sm whitespace-nowrap">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>

            {/* Toggle Filter Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border border-purple-500/60 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:from-purple-600/50 hover:to-cyan-600/50 transition-all duration-300"
            >
              <FiFilter className="w-5 h-5" />
              Filters
            </motion.button>

            {/* Results Count */}
            <div className="px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white flex items-center gap-2 justify-center">
              <FiTag className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span className="text-sm font-semibold">
                {filteredProducts.length}
              </span>
            </div>
          </div>

          {/* Advanced Filters (Collapsible) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-purple-500/20 rounded-xl space-y-6">
                  {/* Price Range Slider */}
                  <div>
                    <label className="text-white font-semibold mb-4 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const newMin = parseInt(e.target.value);
                          if (newMin <= priceRange[1]) {
                            setPriceRange([newMin, priceRange[1]]);
                            setPage(1);
                          }
                        }}
                        className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const newMax = parseInt(e.target.value);
                          if (newMax >= priceRange[0]) {
                            setPriceRange([priceRange[0], newMax]);
                            setPage(1);
                          }
                        }}
                        className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <p className="text-white font-semibold mb-3">
                      Quick Price Filters:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "Budget ($0-$500)", range: [0, 500] },
                        { label: "Mid-Range ($500-$2000)", range: [500, 2000] },
                        { label: "Premium ($2000-$5000)", range: [2000, 5000] },
                        { label: "Luxury ($5000+)", range: [5000, 10000] },
                      ].map((filter) => (
                        <motion.button
                          key={filter.label}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setPriceRange(filter.range);
                            setPage(1);
                          }}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            priceRange[0] === filter.range[0] &&
                            priceRange[1] === filter.range[1]
                              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                              : "bg-slate-700/50 text-gray-300 hover:bg-slate-700"
                          }`}
                        >
                          {filter.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Reset Filters Button */}
                  {(searchTerm ||
                    selectedCategory !== "all" ||
                    priceRange[0] !== 0 ||
                    priceRange[1] !== 10000) && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleResetFilters}
                      className="w-full px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-300 rounded-lg font-semibold hover:bg-red-500/30 transition-all duration-300"
                    >
                      Reset All Filters
                    </motion.button>
                  )}

                  {/* Refresh Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRefresh}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <FiRefreshCw
                      className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                    />
                    Refresh Products
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Products Grid Section */}
      <div className="products-section relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FiLoader className="w-12 h-12 text-cyan-400" />
              </motion.div>
              <p className="text-gray-400 font-semibold">Loading products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-96 text-center"
          >
            <FiSearch className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              No Products Found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filters
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetFilters}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Products Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id || `${product.title}-${index}`}
                    product={product}
                    index={index}
                   
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            <Pagination totalPages={totalPages} page={page} setPage={setPage} />
          </>
        )}
      </div>
    </div>
  );
}
