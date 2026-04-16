import React, { useContext } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Alert, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const router = useRouter();
  const { cart, placeOrder } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isWide = width > 700;

  const handlePlaceOrder = () => {
    placeOrder();
    Alert.alert("Order Placed!", "Thank you for your order. Your items will be delivered soon.", [
      { text: "OK", onPress: () => router.replace("/screens/Home") },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={isWide ? styles.wideLayout : { flex: 1 }}>
        <FlatList
          data={cart}
          style={isWide ? { flex: 1 } : undefined}
          keyExtractor={(item, index) => item.id + index}
          contentContainerStyle={{ padding: 14 }}
          ListHeaderComponent={
            <View style={styles.sectionCard}>
              <Text style={styles.sectionNum}>1</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Shipping address</Text>
                <Text style={styles.sectionDetail}>123 Demo Street, Sample City, ST 12345</Text>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                {item.prime && (
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                    <View style={styles.primeBadge}><Text style={styles.primeText}>prime</Text></View>
                    <Text style={styles.freeDelivery}> FREE delivery</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        {/* Order summary */}
        <View style={[styles.summaryBox, isWide && styles.summarySidebar]}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items ({cart.length}):</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping:</Text>
            <Text style={[styles.summaryValue, { color: "#007600" }]}>FREE</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Order total:</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderText}>Place your order</Text>
          </TouchableOpacity>
          <Text style={styles.disclaimer}>
            By placing your order, you agree to Mini Amazon's demo terms.
          </Text>
        </View>
      </View>
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

  wideLayout: { flex: 1, flexDirection: "row" },

  sectionCard: {
    flexDirection: "row", alignItems: "flex-start", gap: 10,
    backgroundColor: "#fff", padding: 14, borderRadius: 4, marginBottom: 14,
  },
  sectionNum: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: "#232f3e",
    color: "#fff", fontSize: 14, fontWeight: "bold", textAlign: "center", lineHeight: 24,
    overflow: "hidden",
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#0f1111" },
  sectionDetail: { fontSize: 13, color: "#565959", marginTop: 2 },

  item: {
    flexDirection: "row", backgroundColor: "#fff", padding: 12, borderRadius: 4, alignItems: "center",
  },
  itemImage: { width: 70, height: 70, borderRadius: 4, backgroundColor: "#f7f7f7" },
  itemName: { fontSize: 13, color: "#0f1111", lineHeight: 18 },
  itemPrice: { fontSize: 16, fontWeight: "bold", color: "#0f1111", marginTop: 4 },
  primeBadge: { backgroundColor: "#232f3e", paddingHorizontal: 5, paddingVertical: 1, borderRadius: 3 },
  primeText: { color: "#00a8e1", fontSize: 10, fontWeight: "bold", fontStyle: "italic" },
  freeDelivery: { color: "#565959", fontSize: 12 },
  separator: { height: 1, backgroundColor: "#e7e7e7", marginVertical: 6 },

  summaryBox: {
    backgroundColor: "#fff", padding: 16, borderTopWidth: 1, borderTopColor: "#e7e7e7",
  },
  summarySidebar: {
    width: 300, borderTopWidth: 0, borderLeftWidth: 1, borderLeftColor: "#e7e7e7",
    alignSelf: "flex-start", margin: 14, borderRadius: 8,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  summaryTitle: { fontSize: 18, fontWeight: "bold", color: "#0f1111", marginBottom: 12 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  summaryLabel: { fontSize: 13, color: "#565959" },
  summaryValue: { fontSize: 13, color: "#0f1111" },
  totalRow: { borderTopWidth: 1, borderTopColor: "#e7e7e7", paddingTop: 10, marginTop: 4 },
  totalLabel: { fontSize: 16, fontWeight: "bold", color: "#cc0c39" },
  totalValue: { fontSize: 16, fontWeight: "bold", color: "#cc0c39" },
  placeOrderBtn: { backgroundColor: "#ffd814", paddingVertical: 10, borderRadius: 20, alignItems: "center", marginTop: 14 },
  placeOrderText: { fontWeight: "bold", fontSize: 14, color: "#0f1111" },
  disclaimer: { fontSize: 11, color: "#999", marginTop: 10, textAlign: "center" },
});
