"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  quantity: number;
}

export interface StoreContextType {
  cartItems: CartItem[];
  wishlistIds: string[];
  cartCount: number;
  wishlistCount: number;
  isInCart: (id: string) => boolean;
  isInWishlist: (id: string) => boolean;
  getCartQuantity: (id: string) => number;
  addToCart: (id: string, quantity?: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateCartQuantity: (id: string, delta: number) => Promise<void>;
  toggleWishlist: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  moveToWishlist: (id: string) => Promise<void>;
  moveToCart: (id: string) => Promise<void>;
  moveAllToWishlist: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Calculate dynamic counts
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistIds.length;

  // Sync initial state from server API on mount
  useEffect(() => {
    async function syncInitialState() {
      try {
        const [cartRes, wishlistRes] = await Promise.all([
          fetch("/api/cart"),
          fetch("/api/wishlist"),
        ]);

        if (cartRes.ok) {
          const cartData = await cartRes.json();
          if (Array.isArray(cartData.cartItems)) {
            setCartItems(cartData.cartItems);
          }
        }

        if (wishlistRes.ok) {
          const wishlistData = await wishlistRes.json();
          if (Array.isArray(wishlistData.wishlistedIds)) {
            setWishlistIds(wishlistData.wishlistedIds);
          }
        }
      } catch (err) {
        console.warn("StoreProvider initial sync warning:", err);
      }
    }

    syncInitialState();
  }, []);

  const isInCart = (id: string): boolean => {
    return cartItems.some((item) => item.id === id);
  };

  const isInWishlist = (id: string): boolean => {
    return wishlistIds.includes(id);
  };

  const getCartQuantity = (id: string): number => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  // Add to cart: if already in cart, do NOT duplicate or count again
  const addToCart = async (id: string, quantity = 1): Promise<void> => {
    if (isInCart(id)) return; // Prevent duplicate addition

    const updated = [...cartItems, { id, quantity: Math.max(1, quantity) }];
    setCartItems(updated);

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, action: "add", quantity }),
      });
    } catch (err) {
      console.warn("Failed to sync cart add to server:", err);
    }
  };

  const removeFromCart = async (id: string): Promise<void> => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, action: "remove" }),
      });
    } catch (err) {
      console.warn("Failed to sync cart removal to server:", err);
    }
  };

  const clearCart = async (): Promise<void> => {
    setCartItems([]);
    try {
      const itemsToRemove = [...cartItems];
      for (const item of itemsToRemove) {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: item.id, action: "remove" }),
        });
      }
    } catch (err) {
      console.warn("Failed to clear cart:", err);
    }
  };

  // Follow + and - rules of increment/decrement
  const updateCartQuantity = async (id: string, delta: number): Promise<void> => {
    setCartItems((prevCart) => {
      const existingIndex = prevCart.findIndex((i) => i.id === id);
      if (existingIndex === -1) {
        if (delta > 0) return [...prevCart, { id, quantity: delta }];
        return prevCart;
      }

      const newQty = prevCart[existingIndex].quantity + delta;
      if (newQty <= 0) {
        return prevCart.filter((i) => i.id !== id);
      }

      const copy = [...prevCart];
      copy[existingIndex] = { ...copy[existingIndex], quantity: newQty };
      return copy;
    });

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, action: "update", delta }),
      });
    } catch (err) {
      console.warn("Failed to sync quantity update to server:", err);
    }
  };

  // Toggle wishlist state (+1 when adding, -1 when removing, no duplicate counts)
  const toggleWishlist = async (id: string): Promise<void> => {
    const currentlyWishlisted = wishlistIds.includes(id);

    if (currentlyWishlisted) {
      setWishlistIds((prev) => prev.filter((item) => item !== id));
    } else {
      setWishlistIds((prev) => [...prev, id]);
    }

    try {
      await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, action: "toggle" }),
      });
    } catch (err) {
      console.warn("Failed to sync wishlist toggle to server:", err);
    }
  };

  const moveToWishlist = async (id: string): Promise<void> => {
    await removeFromCart(id);
    if (!isInWishlist(id)) {
      await toggleWishlist(id);
    }
  };

  const moveToCart = async (id: string): Promise<void> => {
    if (isInWishlist(id)) {
      await toggleWishlist(id);
    }
    await addToCart(id, 1);
  };

  const moveAllToWishlist = async (): Promise<void> => {
    const currentCart = [...cartItems];
    for (const item of currentCart) {
      await moveToWishlist(item.id);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        wishlistIds,
        cartCount,
        wishlistCount,
        isInCart,
        isInWishlist,
        getCartQuantity,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        clearCart,
        moveToWishlist,
        moveToCart,
        moveAllToWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
