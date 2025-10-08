import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
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
        <Text style={styles.name}>{product.name}</Text>
        <Text>${product.price}</Text>
        <Button title="Remove" onPress={() => onRemove(product.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { flex: 1, marginLeft: 10, justifyContent: "space-between" },
  name: { fontWeight: "bold" },
});