// app/screens/Checkout.tsx
import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart, placeOrder } = useContext(CartContext);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Checkout</Text>
      {cart.map((p) => (
        <Text key={p.id}>
          {p.name} - ${p.price}
        </Text>
      ))}
      <TouchableOpacity
        onPress={placeOrder}
        style={{
          backgroundColor: "green",
          padding: 10,
          borderRadius: 8,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}
