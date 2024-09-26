"use client";

import { createContext, useContext, useState } from "react";

import type { CartItem } from "~/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
	incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
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
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  };

	const incrementItem = (id: string) => {
    console.log("incrementItem", id);
		setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity >= 0) {
					console.log("incrementItem", existingItem.quantity);
          return prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }
      }
      return prevItems;
    });
  };

  const decrementItem = (id: string) => {
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

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, incrementItem, decrementItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
