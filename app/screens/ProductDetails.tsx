import React, { useContext } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let stars = "";
  for (let i = 0; i < fullStars; i++) stars += "★";
  if (halfStar) stars += "★";
  const empty = 5 - stars.length;
  for (let i = 0; i < empty; i++) stars += "☆";
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
      <Text style={{ color: "#de7921", fontSize: 16, letterSpacing: 1 }}>{stars}</Text>
      <Text style={{ color: "#de7921", fontSize: 14, marginLeft: 4 }}>{rating}</Text>
      <Text style={{ color: "#007185", fontSize: 14, marginLeft: 8 }}>{count.toLocaleString()} ratings</Text>
    </View>
  );
}

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const liked = isInWishlist(product.id);
  const isWide = width > 700;
  const imageSize = isWide ? Math.min(width * 0.45, 500) : width;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/screens/Cart")} style={styles.cartBtn}>
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        <View style={isWide ? styles.wideLayout : undefined}>
          {/* Image section */}
          <View style={[styles.imageSection, isWide && { width: imageSize }]}>
            <Image source={{ uri: product.image }} style={[styles.image, { height: isWide ? imageSize : width * 0.85 }]} resizeMode="contain" />
          </View>

          {/* Details section */}
          <View style={[styles.details, isWide && { flex: 1 }]}>
            <Text style={styles.name}>{product.name}</Text>

            <TouchableOpacity style={styles.brandLink}>
              <Text style={styles.brandText}>Visit the Mini Amazon Store</Text>
            </TouchableOpacity>

            <StarRating rating={product.rating} count={product.reviewCount} />

            <View style={styles.divider} />

            {/* Price block */}
            <View style={styles.priceBlock}>
              {discount > 0 && (
                <View style={styles.dealBadge}>
                  <Text style={styles.dealText}>Limited time deal</Text>
                </View>
              )}
              <View style={styles.priceRow}>
                {discount > 0 && <Text style={styles.discountPct}>-{discount}%</Text>}
                <Text style={styles.priceSymbol}>$</Text>
                <Text style={styles.priceMain}>{Math.floor(product.price)}</Text>
                <Text style={styles.priceCents}>{((product.price % 1) * 100).toFixed(0).padStart(2, "0")}</Text>
              </View>
              {product.originalPrice && (
                <Text style={styles.listPrice}>List Price: <Text style={styles.listPriceStrike}>${product.originalPrice.toFixed(2)}</Text></Text>
              )}
              {product.prime && (
                <View style={styles.primeRow}>
                  <View style={styles.primeBadge}><Text style={styles.primeText}>prime</Text></View>
                  <Text style={styles.delivery}>FREE delivery</Text>
                </View>
              )}
            </View>

            <View style={styles.divider} />

            {/* Description */}
            <Text style={styles.aboutTitle}>About this item</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky bottom buttons */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity
          onPress={() => liked ? removeFromWishlist(product.id) : addToWishlist(product)}
          style={styles.wishlistBtn}
        >
          <Text style={{ fontSize: 20, color: liked ? "#e74c3c" : "#555" }}>{liked ? "♥" : "♡"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => {
            addToCart(product);
            Alert.alert("Added to Cart", `${product.name.substring(0, 40)}... added to your cart`);
          }}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyNowBtn}
          onPress={() => {
            addToCart(product);
            router.push("/screens/Checkout");
          }}
        >
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 12, paddingBottom: 8, backgroundColor: "#131921",
  },
  backBtn: { padding: 4 },
  backText: { color: "#febd69", fontSize: 16, fontWeight: "600" },
  cartBtn: { padding: 4 },
  cartIcon: { fontSize: 22 },

  wideLayout: { flexDirection: "row", alignItems: "flex-start" },
  imageSection: { backgroundColor: "#f7f7f7", alignItems: "center", justifyContent: "center", padding: 20 },
  image: { width: "100%", maxHeight: 500 },

  details: { padding: 16 },
  name: { fontSize: 18, color: "#0f1111", lineHeight: 24 },
  brandLink: { marginTop: 4 },
  brandText: { color: "#007185", fontSize: 14 },

  divider: { height: 1, backgroundColor: "#e7e7e7", marginVertical: 12 },

  priceBlock: {},
  dealBadge: { backgroundColor: "#cc0c39", alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, marginBottom: 6 },
  dealText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  priceRow: { flexDirection: "row", alignItems: "flex-start" },
  discountPct: { fontSize: 26, color: "#cc0c39", fontWeight: "300", marginRight: 6 },
  priceSymbol: { fontSize: 13, color: "#0f1111", marginTop: 2 },
  priceMain: { fontSize: 28, color: "#0f1111", fontWeight: "400", lineHeight: 32 },
  priceCents: { fontSize: 13, color: "#0f1111", marginTop: 2 },
  listPrice: { fontSize: 13, color: "#565959", marginTop: 4 },
  listPriceStrike: { textDecorationLine: "line-through" },
  primeRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 8 },
  primeBadge: { backgroundColor: "#232f3e", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3 },
  primeText: { color: "#00a8e1", fontSize: 12, fontWeight: "bold", fontStyle: "italic" },
  delivery: { color: "#0f1111", fontSize: 13 },

  aboutTitle: { fontSize: 16, fontWeight: "bold", color: "#0f1111", marginBottom: 8 },
  description: { fontSize: 14, color: "#333", lineHeight: 22 },

  bottomBar: {
    flexDirection: "row", alignItems: "center", gap: 10,
    paddingHorizontal: 14, paddingTop: 10,
    backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#e7e7e7",
  },
  wishlistBtn: {
    width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: "#d5d9d9",
    alignItems: "center", justifyContent: "center", backgroundColor: "#fff",
  },
  addToCartBtn: {
    flex: 1, backgroundColor: "#ffd814", paddingVertical: 12,
    borderRadius: 20, alignItems: "center",
  },
  addToCartText: { fontWeight: "bold", fontSize: 15, color: "#0f1111" },
  buyNowBtn: {
    flex: 1, backgroundColor: "#ffa41c", paddingVertical: 12,
    borderRadius: 20, alignItems: "center",
  },
  buyNowText: { fontWeight: "bold", fontSize: 15, color: "#0f1111" },
});
