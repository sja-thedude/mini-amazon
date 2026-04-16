import React, { useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

export default function Wishlist() {
  const router = useRouter();
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 800);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Wish List</Text>
        <View style={{ width: 50 }} />
      </View>

      {wishlist.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ fontSize: 40 }}>♡</Text>
          <Text style={styles.emptyTitle}>Your Wish List is empty</Text>
          <Text style={styles.emptySubtitle}>Save items you love to buy them later</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => router.back()}>
            <Text style={styles.shopBtnText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[{ padding: 14 }, { maxWidth, alignSelf: "center", width: "100%" }]}
          ListHeaderComponent={
            <Text style={styles.listTitle}>Wish List ({wishlist.length} {wishlist.length === 1 ? "item" : "items"})</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                {item.originalPrice && (
                  <Text style={styles.originalPrice}>List: <Text style={{ textDecorationLine: "line-through" }}>${item.originalPrice.toFixed(2)}</Text></Text>
                )}
                {item.prime && (
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                    <View style={styles.primeBadge}><Text style={styles.primeText}>prime</Text></View>
                  </View>
                )}
                <Text style={styles.stockText}>In Stock</Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.addCartBtn}
                    onPress={() => {
                      addToCart(item);
                      Alert.alert("Added", `${item.name.substring(0, 30)}... added to cart`);
                    }}
                  >
                    <Text style={styles.addCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeFromWishlist(item.id)} style={styles.deleteBtn}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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

  listTitle: { fontSize: 20, fontWeight: "bold", color: "#0f1111", marginBottom: 12 },

  item: { flexDirection: "row", backgroundColor: "#fff", padding: 14, borderRadius: 4 },
  itemImage: { width: 100, height: 100, borderRadius: 4, backgroundColor: "#f7f7f7" },
  itemInfo: { flex: 1, marginLeft: 14 },
  itemName: { fontSize: 14, color: "#0f1111", lineHeight: 20 },
  itemPrice: { fontSize: 18, fontWeight: "bold", color: "#0f1111", marginTop: 4 },
  originalPrice: { fontSize: 12, color: "#565959", marginTop: 2 },
  primeBadge: { backgroundColor: "#232f3e", paddingHorizontal: 5, paddingVertical: 1, borderRadius: 3 },
  primeText: { color: "#00a8e1", fontSize: 10, fontWeight: "bold", fontStyle: "italic" },
  stockText: { color: "#007600", fontSize: 12, marginTop: 4 },
  actions: { flexDirection: "row", gap: 10, marginTop: 8 },
  addCartBtn: { backgroundColor: "#ffd814", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16 },
  addCartText: { fontWeight: "bold", fontSize: 12, color: "#0f1111" },
  deleteBtn: { borderWidth: 1, borderColor: "#d5d9d9", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: "#f0f2f2" },
  deleteText: { fontSize: 12, color: "#0f1111" },
  separator: { height: 1, backgroundColor: "#e7e7e7", marginVertical: 8 },
});
