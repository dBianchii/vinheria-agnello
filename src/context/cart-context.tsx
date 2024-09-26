"use client";

import { type IProduto } from "data/vinhos";
import { createContext, useContext, useEffect, useState } from "react";

import type { CartItem } from "~/lib/types";

interface CartContextType {
  items: CartItem[];
  incrementItem: (product: IProduto) => void;
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

const productToCartItem = (product: IProduto): CartItem => ({
  id: product.id,
  name: product.name,
  imgUrl: product.img,
  price: product.preco,
  discount: product.desconto,
  quantity: 1,
});

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

  const incrementItem = (product: IProduto) => {
    if (!items.find((item) => item.id === product.id))
      return setItems([...items, productToCartItem(product)]);

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
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
      value={{ items, incrementItem, decrementItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
