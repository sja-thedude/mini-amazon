import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert, FlatList, Image, StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";

export default function Dashboard() {
  const { logout, user } = useContext(AuthContext);
  const { products, removeProduct } = useContext(ProductContext);
  const { orders } = useContext(CartContext);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isWide = width > 700;
  const maxWidth = Math.min(width, 900);

  const totalRevenue = orders.flat().reduce((sum, p) => sum + p.price, 0);

  const handleLogout = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => { logout(); router.replace("/"); } },
    ]);
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert("Delete Product", `Remove "${name}" from the store?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => removeProduct(id) },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
        <View style={styles.headerLeft}>
          <View style={styles.logoRow}>
            <Text style={styles.logoMini}>mini</Text>
            <Text style={styles.logoAmazon}>amazon</Text>
          </View>
          <Text style={styles.sellerText}>Seller Central</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[{ padding: 14, paddingBottom: insets.bottom + 20 }, { maxWidth, alignSelf: "center", width: "100%" }]}
        ListHeaderComponent={
          <>
            {/* Stats row */}
            <View style={[styles.statsRow, isWide && { gap: 14 }]}>
              <View style={[styles.statCard, { borderLeftColor: "#232f3e" }]}>
                <Text style={styles.statNumber}>{products.length}</Text>
                <Text style={styles.statLabel}>Products</Text>
              </View>
              <View style={[styles.statCard, { borderLeftColor: "#f08804" }]}>
                <Text style={styles.statNumber}>{orders.length}</Text>
                <Text style={styles.statLabel}>Orders</Text>
              </View>
              <View style={[styles.statCard, { borderLeftColor: "#007600" }]}>
                <Text style={styles.statNumber}>${totalRevenue.toFixed(0)}</Text>
                <Text style={styles.statLabel}>Revenue</Text>
              </View>
            </View>

            {/* Action buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => router.push("/admin/AddProduct")} style={styles.addBtn}>
                <Text style={styles.addBtnText}>+ Add new product</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/admin/Orders")} style={styles.ordersBtn}>
                <Text style={styles.ordersBtnText}>View all orders</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Inventory ({products.length} items)</Text>
          </>
        }
        renderItem={({ item }) => {
          const discount = item.originalPrice
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : 0;
          return (
            <View style={styles.productRow}>
              <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  ${item.price.toFixed(2)}
                  {item.originalPrice && <Text style={styles.productOriginal}> ${item.originalPrice.toFixed(2)}</Text>}
                </Text>
                <Text style={styles.productMeta}>{item.category} · ★ {item.rating} ({item.reviewCount.toLocaleString()})</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id, item.name)} style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaeded" },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 14, paddingBottom: 8, backgroundColor: "#131921",
  },
  headerLeft: { flexDirection: "row", alignItems: "baseline", gap: 10 },
  logoRow: { flexDirection: "row", alignItems: "baseline" },
  logoMini: { fontSize: 18, fontWeight: "300", color: "#fff", fontStyle: "italic" },
  logoAmazon: { fontSize: 18, fontWeight: "bold", color: "#febd69", fontStyle: "italic" },
  sellerText: { color: "#aaa", fontSize: 13 },
  logoutBtn: { borderWidth: 1, borderColor: "#555", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 4 },
  logoutText: { color: "#ccc", fontSize: 13 },

  statsRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  statCard: {
    flex: 1, backgroundColor: "#fff", padding: 16, borderRadius: 4,
    borderLeftWidth: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 2, elevation: 1,
  },
  statNumber: { fontSize: 24, fontWeight: "bold", color: "#0f1111" },
  statLabel: { fontSize: 12, color: "#565959", marginTop: 4 },

  actionRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  addBtn: { flex: 1, backgroundColor: "#ffd814", paddingVertical: 10, borderRadius: 20, alignItems: "center" },
  addBtnText: { fontWeight: "bold", color: "#0f1111", fontSize: 14 },
  ordersBtn: { flex: 1, backgroundColor: "#fff", paddingVertical: 10, borderRadius: 20, alignItems: "center", borderWidth: 1, borderColor: "#d5d9d9" },
  ordersBtnText: { fontWeight: "bold", color: "#0f1111", fontSize: 14 },

  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#0f1111", marginBottom: 10 },

  productRow: {
    flexDirection: "row", backgroundColor: "#fff", padding: 12, borderRadius: 4, alignItems: "center",
  },
  productImage: { width: 55, height: 55, borderRadius: 4, backgroundColor: "#f7f7f7" },
  productName: { fontSize: 13, color: "#0f1111", fontWeight: "600" },
  productPrice: { fontSize: 15, fontWeight: "bold", color: "#0f1111", marginTop: 2 },
  productOriginal: { fontSize: 12, fontWeight: "normal", color: "#565959", textDecorationLine: "line-through" },
  productMeta: { fontSize: 11, color: "#565959", marginTop: 2 },
  deleteBtn: { borderWidth: 1, borderColor: "#d5d9d9", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, backgroundColor: "#f0f2f2" },
  deleteText: { fontSize: 12, color: "#0f1111" },
});
