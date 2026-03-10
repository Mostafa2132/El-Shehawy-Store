"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, useWishlist } from '@/context/StoreContext';
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiSearch,
  FiUser,
  FiHeart,
  FiChevronDown,
  FiZap,
} from 'react-icons/fi';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      href: '/products',
     
    },
    { label: 'Deals', href: '/deals' },
    { label: 'Contact', href: '/contact' },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      x: -300,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };



  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-purple-500/20 shadow-2xl'
            : 'bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link
                href="/"
                className="flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
                  <FiZap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  El-Shehawy
                </span>
              </a>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    whileHover={{ color: '#06b6d4' }}
                    className="flex items-center gap-1 text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                  >
                    {item.label}
               
                  </Link>

              
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">

              {/* Wishlist */}
              <Link href="/wishlist">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-gray-400 hover:text-pink-400 transition-all duration-300 group hidden sm:flex cursor-pointer"
                >
                  <FiHeart className="w-5 h-5 group-hover:fill-pink-400 transition-all" />
                  {wishlistCount > 0 && (
                    <motion.span
                      key={wishlistCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* User Account */}
              <Link href="/profile">
                <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-gray-400 hover:text-purple-400 transition-all duration-300 hidden sm:flex"
              >
                <FiUser className="w-5 h-5" />
              </motion.button>
              </Link>

              {/* Shopping Cart */}
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2.5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/40 hover:to-blue-600/40 text-cyan-400 transition-all duration-300 group cursor-pointer"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    >
                      {cartCount > 99 ? '99+' : cartCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-gray-400 hover:text-cyan-400 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiX className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 top-20 md:hidden bg-slate-950/95 backdrop-blur-md z-40 flex flex-col"
          >
            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => {
                      if (item.submenu) {
                        activeDropdown === index ? setActiveDropdown(null) : setActiveDropdown(index);
                      } else {
                        // Close menu if it's a direct link, or we could just use a Link component instead, but the current implementation uses button for mobile. If it's a link, we need a way to navigate. But looking at the current code, it just toggles dropdown. We assume user clicks the submenu or link elsewhere.
                      }
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-gray-300 hover:text-cyan-400 transition-all duration-300"
                  >
                    {item.href && !item.submenu ? (
                      <Link href={item.href} className="flex-1 text-left font-semibold" onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Link>
                    ) : (
                      <span className="font-semibold">{item.label}</span>
                    )}

                    {item.submenu && (
                      <motion.div
                        animate={{
                          rotate: activeDropdown === index ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <FiChevronDown className="w-5 h-5" />
                      </motion.div>
                    )}
                  </button>

                  {/* Mobile Submenu */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-2 space-y-2 pl-4"
                      >
                        {item.submenu.map((subitem, subindex) => {
                          const SubIcon = subitem.icon;
                          return (
                            <Link
                              href={subitem.href}
                              key={subindex}
                              onClick={() => setIsOpen(false)}
                            >
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subindex * 0.05 }}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-800/30 hover:bg-slate-800/60 text-gray-400 hover:text-cyan-400 transition-all duration-200 cursor-pointer"
                              >
                                {SubIcon && <SubIcon className="w-5 h-5 text-purple-400" />}
                                <span className="font-medium text-sm">{subitem.label}</span>
                              </motion.div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Mobile Bottom Actions (Search, Wishlist, Profile) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-3 gap-4"
              >
             

                <Link href="/wishlist" onClick={() => setIsOpen(false)}>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-900/50 hover:bg-slate-800 text-gray-400 hover:text-pink-400 transition-all duration-300 relative cursor-pointer">
                    <div className="relative">
                      <FiHeart className="w-6 h-6" />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                          {wishlistCount}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium">Wishlist</span>
                  </div>
                </Link>

                <Link href="/profile" onClick={() => setIsOpen(false)}>
                  <button className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-900/50 hover:bg-slate-800 text-gray-400 hover:text-purple-400 transition-all duration-300 w-full">
                    <FiUser className="w-6 h-6" />
                    <span className="text-xs font-medium">Profile</span>
                  </button>
                </Link>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}