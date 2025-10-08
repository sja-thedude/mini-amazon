// app/admin/Orders.tsx
import React, { useContext } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { CartContext } from "../context/CartContext";

export default function AdminOrders() {
  const { orders } = useContext(CartContext);

  if (orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No orders yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.orderContainer}>
          <Text style={styles.orderTitle}>Order #{index + 1}</Text>
          {item.map((product) => (
            <View key={product.id} style={styles.productRow}>
              <Image source={{ uri: product.image }} style={styles.image} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.name}>{product.name}</Text>
                <Text>${product.price}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  orderContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  orderTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  productRow: { flexDirection: "row", marginBottom: 5, alignItems: "center" },
  image: { width: 50, height: 50, borderRadius: 4 },
  name: { fontWeight: "bold" },
});
