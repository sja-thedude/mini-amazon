// app/screens/ProductDetails.tsx
import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import Button from "../components/Button";
import { CartContext } from "../context/CartContext";

export default function ProductDetails({ route }: any) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Image source={{ uri: product.image }} style={{ width: "100%", height: 200 }} />
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{product.name}</Text>
      <Text style={{ fontSize: 18, color: "green" }}>${product.price}</Text>
      <Text>{product.description}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(product)} />
    </View>
  );
}
