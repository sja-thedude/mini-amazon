import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Product } from "../types/product";

type Props = {
  product: Product;
  onRemove: (id: string) => void;
};

export default function CartItem({ product, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(product.id)} style={styles.removeButton}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  image: { width: 60, height: 60, borderRadius: 6 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontWeight: "bold", fontSize: 15 },
  price: { color: "#e47911", fontWeight: "600", marginTop: 2 },
  removeButton: { paddingHorizontal: 10, paddingVertical: 6 },
  removeText: { color: "#e74c3c", fontWeight: "600", fontSize: 13 },
});
