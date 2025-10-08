// app/_layout.tsx
import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Slot /> {/* Must render immediately */}
      </CartProvider>
    </AuthProvider>
  );
}
