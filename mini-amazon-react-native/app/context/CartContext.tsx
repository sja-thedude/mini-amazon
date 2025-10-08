// app/context/CartContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { Product } from "../types/product";

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  orders: Product[][];
  placeOrder: () => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  orders: [],
  placeOrder: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Product[][]>([]);

  const addToCart = (product: Product) => setCart([...cart, product]);
  const removeFromCart = (productId: string) =>
    setCart(cart.filter((p) => p.id !== productId));
  const clearCart = () => setCart([]);

  const placeOrder = () => {
    if (cart.length === 0) return;
    setOrders([...orders, cart]); // save current cart as new order
    clearCart(); // empty cart after placing order
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, orders, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};
