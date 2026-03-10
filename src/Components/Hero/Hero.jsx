"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiShoppingCart,
  FiZap,
  FiMonitor,
  FiCpu,
  FiHardDrive,
  FiHeadphones,
  FiArrowRight,
  FiStar,
  FiTrendingUp,
  FiChevronDown,
} from 'react-icons/fi';
import { SiNvidia, SiAmd, SiIntel } from 'react-icons/si';

export default function ElShehawyHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const products = [
    { icon: FiCpu, label: 'High-Performance CPUs', delay: 0, color: 'from-cyan-500 to-blue-600' },
    { icon: FiMonitor, label: 'Premium Displays', delay: 0.1, color: 'from-purple-500 to-pink-600' },
    { icon: FiHeadphones, label: 'Audio Systems', delay: 0.2, color: 'from-orange-500 to-red-600' },
  ];

  const brands = [
    { icon: SiNvidia, name: 'NVIDIA' },
    { icon: SiIntel, name: 'Intel' },
    { icon: SiAmd, name: 'AMD' },
  ];

  const stats = [
    { value: '10K+', label: 'Products', icon: FiTrendingUp },
    { value: '99%', label: 'Satisfied Customers', icon: FiStar },
    { value: '24/7', label: 'Support', icon: FiZap },
  ];

  return (
    <div className="relative min-h-screen pt-24 overflow-hidden bg-slate-950">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(139, 92, 246, 0.05) 25%, rgba(139, 92, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.05) 75%, rgba(139, 92, 246, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, 0.05) 25%, rgba(139, 92, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.05) 75%, rgba(139, 92, 246, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-full blur-3xl opacity-30"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-600 via-pink-500 to-red-500 rounded-full blur-3xl opacity-30"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Cursor Glow */}
      {isHovered && (
        <motion.div
          className="pointer-events-none fixed w-80 h-80 bg-gradient-radial from-cyan-400 to-transparent rounded-full blur-3xl opacity-15 mix-blend-screen"
          animate={{
            x: mousePosition.x - 160,
            y: mousePosition.y - 160,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />
      )}

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/40 backdrop-blur-sm hover:border-cyan-500/60 transition-all duration-300">
            <FiZap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Tomorrow's Technology Today
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter mb-6">
            <span className="block text-white mb-3">El-Shehawy</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
              Tech Powerhouse
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Your ultimate destination for premium computer components and cutting-edge technology hardware from world-leading brands
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <FiShoppingCart className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            Start Shopping
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white font-bold rounded-xl border-2 border-purple-500/60 hover:border-purple-500 text-lg transition-all duration-300 group flex items-center justify-center gap-2"
          >
            Explore Products
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Product Categories */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-16"
        >
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={index}
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: product.delay }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 0 50px rgba(139, 92, 246, 0.5)',
                }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-purple-500/30 hover:border-cyan-500/60 backdrop-blur-sm transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${product.color} opacity-20 group-hover:opacity-40 transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-cyan-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-white font-semibold text-center text-lg">{product.label}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Brands Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <p className="text-gray-400 text-center mb-6 text-sm font-semibold uppercase tracking-widest">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {brands.map((brand, index) => {
              const BrandIcon = brand.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 group-hover:border-cyan-500/50 transition-all duration-300">
                    <BrandIcon className="w-8 h-8 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{brand.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mb-16"
        >
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border border-purple-500/30 text-center backdrop-blur-sm"
              >
                <div className="flex justify-center mb-3">
                  <StatIcon className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

     
      </motion.div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
            animate={{
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Top Right Accent */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-600/10 to-transparent rounded-full blur-2xl pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />
    </div>
  );
}