"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

// ===== Cart Context =====
const CartContext = createContext(null);

// ===== Wishlist Context =====
const WishlistContext = createContext(null);

// ===== Provider =====
export function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("store_cart");
      const savedWishlist = localStorage.getItem("store_wishlist");
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
    } catch (error) {
      console.error("Error loading state from localStorage:", error);
    }
    setIsInitialized(true);
  }, []);

  // Save Cart to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("store_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // Save Wishlist to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("store_wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isInitialized]);

  // --------------- CART ---------------
  const addToCart = useCallback((product) => {
    const qtyToAdd = product.quantity || 1;
    let isExisting = false;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        isExisting = true;
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prev, { ...product, quantity: qtyToAdd }];
    });

    // Run side-effects (toasts) outside setState to prevent double calls in StrictMode
    if (isExisting) {
      toast.info(`"${product.title}" quantity updated in cart 🛒`, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark",
      });
    } else {
      toast.success(`"${product.title}" added to cart! 🛒`, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark",
      });
    }
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // --------------- WISHLIST ---------------
  const toggleWishlist = useCallback((product) => {
    let isAdding = false;

    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      isAdding = true;
      return [...prev, product];
    });

    // Run side-effects (toasts) outside setState
    if (!isAdding) {
      toast.info(`"${product.title}" removed from wishlist`, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark",
        icon: "💔",
      });
    } else {
      toast.success(`"${product.title}" added to wishlist! ❤️`, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark",
      });
    }
  }, []);

  const isWishlisted = useCallback(
    (productId) => wishlistItems.some((item) => item.id === productId),
    [wishlistItems]
  );

  const wishlistCount = wishlistItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount }}>
      <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isWishlisted, wishlistCount }}>
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
}

// ===== Hooks =====
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside StoreProvider");
  return ctx;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside StoreProvider");
  return ctx;
}
