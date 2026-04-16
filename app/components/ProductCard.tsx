// app/components/ProductCard.tsx
import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { Product } from "../types/product";

type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

export default function ProductCard({ product, onAddToCart }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Button title="Add to Cart" onPress={() => onAddToCart?.(product)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 10, margin: 10, borderWidth: 1, borderRadius: 8 },
  image: { width: "100%", height: 150, borderRadius: 8 },
  name: { fontWeight: "bold", marginTop: 5 },
  price: { color: "green", marginBottom: 5 },
});
