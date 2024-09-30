"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { CartItem } from "~/lib/types";

interface CartContextType {
  items: CartItem[];
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("cartItems");
      return savedItems ? (JSON.parse(savedItems) as CartItem[]) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const incrementItem = (id: number) => {
    if (!items.find((item) => item.id === id))
      return setItems([...items, { id, quantity: 1 }]);

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return prevItems;
    });
  };

  const decrementItem = (id: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
          );
        }
      }
      return prevItems;
    });
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, incrementItem, decrementItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
