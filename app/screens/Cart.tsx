import React, { useContext } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const router = useRouter();
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isWide = width > 700;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={{ width: 50 }} />
      </View>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ fontSize: 40 }}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add items to get started</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => router.back()}>
            <Text style={styles.shopBtnText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={isWide ? styles.wideLayout : { flex: 1 }}>
          <FlatList
            data={cart}
            style={isWide ? { flex: 1 } : undefined}
            keyExtractor={(item, index) => item.id + index}
            contentContainerStyle={{ padding: 14 }}
            ListHeaderComponent={
              <View style={styles.cartHeader}>
                <Text style={styles.cartTitle}>Shopping Cart</Text>
                <TouchableOpacity onPress={clearCart}>
                  <Text style={styles.clearText}>Remove all items</Text>
                </TouchableOpacity>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                  {item.prime && (
                    <View style={styles.primeRow}>
                      <View style={styles.primeBadge}><Text style={styles.primeText}>prime</Text></View>
                    </View>
                  )}
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <Text style={styles.stockText}>In Stock</Text>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                    <Text style={styles.removeBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />

          {/* Subtotal sidebar or footer */}
          <View style={[styles.subtotalBox, isWide && styles.subtotalSidebar]}>
            <Text style={styles.subtotalLabel}>
              Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"}):{" "}
              <Text style={styles.subtotalPrice}>${total.toFixed(2)}</Text>
            </Text>
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push("/screens/Checkout")}>
              <Text style={styles.checkoutBtnText}>Proceed to checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaeded" },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 12, paddingBottom: 8, backgroundColor: "#131921",
  },
  backText: { color: "#febd69", fontSize: 16, fontWeight: "600" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },

  empty: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  emptyTitle: { fontSize: 20, fontWeight: "bold", color: "#0f1111", marginTop: 12 },
  emptySubtitle: { fontSize: 14, color: "#565959", marginTop: 4 },
  shopBtn: { backgroundColor: "#ffd814", paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20, marginTop: 20 },
  shopBtnText: { fontWeight: "bold", color: "#0f1111" },

  wideLayout: { flex: 1, flexDirection: "row" },

  cartHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cartTitle: { fontSize: 22, fontWeight: "bold", color: "#0f1111" },
  clearText: { color: "#007185", fontSize: 13 },

  cartItem: { flexDirection: "row", backgroundColor: "#fff", padding: 12, borderRadius: 4 },
  itemImage: { width: 100, height: 100, borderRadius: 4, backgroundColor: "#f7f7f7" },
  itemDetails: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 14, color: "#0f1111", lineHeight: 20 },
  primeRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  primeBadge: { backgroundColor: "#232f3e", paddingHorizontal: 5, paddingVertical: 1, borderRadius: 3 },
  primeText: { color: "#00a8e1", fontSize: 10, fontWeight: "bold", fontStyle: "italic" },
  itemPrice: { fontSize: 18, fontWeight: "bold", color: "#0f1111", marginTop: 4 },
  stockText: { color: "#007600", fontSize: 12, marginTop: 2 },
  removeBtn: { marginTop: 6, alignSelf: "flex-start", borderWidth: 1, borderColor: "#d5d9d9", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: "#f0f2f2" },
  removeBtnText: { fontSize: 12, color: "#0f1111" },

  separator: { height: 1, backgroundColor: "#e7e7e7", marginVertical: 8 },

  subtotalBox: {
    backgroundColor: "#fff", padding: 16, borderTopWidth: 1, borderTopColor: "#e7e7e7",
  },
  subtotalSidebar: {
    width: 280, borderTopWidth: 0, borderLeftWidth: 1, borderLeftColor: "#e7e7e7",
    alignSelf: "flex-start", margin: 14, borderRadius: 8,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  subtotalLabel: { fontSize: 16, color: "#0f1111" },
  subtotalPrice: { fontWeight: "bold" },
  checkoutBtn: { backgroundColor: "#ffd814", paddingVertical: 10, borderRadius: 20, alignItems: "center", marginTop: 12 },
  checkoutBtnText: { fontWeight: "bold", fontSize: 14, color: "#0f1111" },
});
