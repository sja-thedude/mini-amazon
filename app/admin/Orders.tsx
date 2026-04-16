import React, { useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CartContext } from "../context/CartContext";

export default function AdminOrders() {
  const { orders } = useContext(CartContext);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 800);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={{ width: 50 }} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ fontSize: 40 }}>📦</Text>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>Orders from customers will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={[{ padding: 14, paddingBottom: insets.bottom + 20 }, { maxWidth, alignSelf: "center", width: "100%" }]}
          renderItem={({ item, index }) => {
            const orderTotal = item.reduce((sum, p) => sum + p.price, 0);
            return (
              <View style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderLabel}>ORDER PLACED</Text>
                    <Text style={styles.orderValue}>Today</Text>
                  </View>
                  <View>
                    <Text style={styles.orderLabel}>TOTAL</Text>
                    <Text style={styles.orderValue}>${orderTotal.toFixed(2)}</Text>
                  </View>
                  <View>
                    <Text style={styles.orderLabel}>ORDER #</Text>
                    <Text style={styles.orderValue}>100-{(index + 1).toString().padStart(4, "0")}</Text>
                  </View>
                </View>
                <View style={styles.orderBody}>
                  <View style={styles.statusRow}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>Delivered</Text>
                  </View>
                  {item.map((product, pIdx) => (
                    <View key={product.id + pIdx} style={styles.productRow}>
                      <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaeded" },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 14, paddingBottom: 8, backgroundColor: "#131921",
  },
  backText: { color: "#febd69", fontSize: 16, fontWeight: "600" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },

  empty: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  emptyTitle: { fontSize: 20, fontWeight: "bold", color: "#0f1111", marginTop: 12 },
  emptySubtitle: { fontSize: 14, color: "#565959", marginTop: 4 },

  orderCard: { backgroundColor: "#fff", borderRadius: 4, marginBottom: 14, overflow: "hidden", borderWidth: 1, borderColor: "#d5d9d9" },
  orderHeader: {
    flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap",
    backgroundColor: "#f0f2f2", paddingHorizontal: 14, paddingVertical: 10, gap: 10,
    borderBottomWidth: 1, borderBottomColor: "#d5d9d9",
  },
  orderLabel: { fontSize: 10, color: "#565959", fontWeight: "600", letterSpacing: 0.5 },
  orderValue: { fontSize: 13, color: "#0f1111", marginTop: 2 },
  orderBody: { padding: 14 },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#007600" },
  statusText: { color: "#007600", fontSize: 14, fontWeight: "bold" },
  productRow: { flexDirection: "row", marginBottom: 8, alignItems: "center" },
  productImage: { width: 50, height: 50, borderRadius: 4, backgroundColor: "#f7f7f7" },
  productName: { fontSize: 13, color: "#007185" },
  productPrice: { fontSize: 13, color: "#565959", marginTop: 2 },
});
