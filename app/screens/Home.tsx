import React, { useContext, useState } from "react";
import {
  View, Text, ScrollView, Image, TouchableOpacity, StyleSheet,
  useWindowDimensions, TextInput, Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

const CATEGORIES = ["All", "Electronics", "Fashion", "Home"];

const DEALS_BANNER = [
  { id: "b1", title: "Up to 40% off", subtitle: "Electronics & Gadgets", color: "#232f3e", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800" },
  { id: "b2", title: "New Arrivals", subtitle: "Fashion Collection", color: "#37475a", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800" },
  { id: "b3", title: "Home Essentials", subtitle: "Starting at $19.99", color: "#131921", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800" },
];

function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let stars = "";
  for (let i = 0; i < fullStars; i++) stars += "★";
  if (halfStar) stars += "★";
  const empty = 5 - stars.length;
  for (let i = 0; i < empty; i++) stars += "☆";
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
      <Text style={{ color: "#de7921", fontSize: 13, letterSpacing: 1 }}>{stars}</Text>
      <Text style={{ color: "#007185", fontSize: 12, marginLeft: 4 }}>{count.toLocaleString()}</Text>
    </View>
  );
}

export default function Home() {
  const router = useRouter();
  const { products } = useContext(ProductContext);
  const { cart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { logout, user } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bannerIndex, setBannerIndex] = useState(0);

  const isWide = width > 768;
  const padding = 12;
  const gap = 10;
  const numColumns = width > 1200 ? 5 : width > 900 ? 4 : width > 600 ? 3 : 2;
  const totalGap = (numColumns - 1) * gap + padding * 2;
  const cardWidth = (width - totalGap) / numColumns;

  const filtered = products.filter((p) => {
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const bannerWidth = width;

  return (
    <View style={styles.container}>
      {/* Top nav bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + 4 }]}>
        <View style={styles.topBarInner}>
          <TouchableOpacity onPress={() => router.replace("/")} style={styles.logoWrap}>
            <Text style={styles.logo}>mini</Text>
            <Text style={styles.logoAmazon}>amazon</Text>
          </TouchableOpacity>
          <View style={[styles.searchBar, isWide && { flex: 1, maxWidth: 600 }]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Mini Amazon"
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <View style={styles.topBarActions}>
            <TouchableOpacity onPress={() => router.push("/screens/Wishlist")} style={styles.topBarBtn}>
              <Text style={styles.topBarIcon}>♥</Text>
              {wishlist.length > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{wishlist.length}</Text></View>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/screens/Cart")} style={styles.topBarBtn}>
              <Text style={styles.topBarIcon}>🛒</Text>
              {cart.length > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{cart.length}</Text></View>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { logout(); router.replace("/"); }} style={styles.topBarBtn}>
              <Text style={styles.topBarSmallText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Category bar */}
      <View style={styles.categoryBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[styles.categoryPill, selectedCategory === cat && styles.categoryPillActive]}
            >
              <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Deals banner carousel */}
        {!search && selectedCategory === "All" && (
          <View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const idx = Math.round(e.nativeEvent.contentOffset.x / bannerWidth);
                setBannerIndex(idx);
              }}
            >
              {DEALS_BANNER.map((item) => (
                <View key={item.id} style={[styles.bannerSlide, { width: bannerWidth }]}>
                  <Image source={{ uri: item.image }} style={styles.bannerImage} />
                  <View style={styles.bannerOverlay}>
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                    <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                    <View style={styles.bannerBtn}>
                      <Text style={styles.bannerBtnText}>Shop now</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={styles.bannerDots}>
              {DEALS_BANNER.map((_, i) => (
                <View key={i} style={[styles.dot, bannerIndex === i && styles.dotActive]} />
              ))}
            </View>
          </View>
        )}

        {/* Section title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {search ? `Results for "${search}"` : selectedCategory === "All" ? "Today's Deals" : selectedCategory}
          </Text>
          <Text style={styles.resultCount}>{filtered.length} results</Text>
        </View>

        {/* Product grid */}
        <View style={[styles.grid, { paddingHorizontal: padding, gap }]}>
          {filtered.map((item) => {
            const discount = item.originalPrice
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : 0;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, { width: cardWidth }]}
                onPress={() => router.push({ pathname: "/screens/ProductDetails", params: { id: item.id } })}
                activeOpacity={0.7}
              >
                <View style={styles.imageWrap}>
                  <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
                  {discount > 0 && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{discount}% off</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={() => isInWishlist(item.id) ? removeFromWishlist(item.id) : addToWishlist(item)}
                    style={styles.heartBtn}
                  >
                    <Text style={{ fontSize: 16, color: isInWishlist(item.id) ? "#e74c3c" : "#999" }}>
                      {isInWishlist(item.id) ? "♥" : "♡"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                  <StarRating rating={item.rating} count={item.reviewCount} />
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    {item.originalPrice && (
                      <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
                    )}
                  </View>
                  {item.prime && (
                    <View style={styles.primeBadge}>
                      <Text style={styles.primeText}>prime</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {filtered.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No products found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaeded" },

  // Top bar
  topBar: { backgroundColor: "#131921", paddingBottom: 8, paddingHorizontal: 12 },
  topBarInner: { flexDirection: "row", alignItems: "center", gap: 10, flexWrap: "wrap" },
  logoWrap: { flexDirection: "row", alignItems: "baseline" },
  logo: { fontSize: 20, fontWeight: "300", color: "#fff", fontStyle: "italic" },
  logoAmazon: { fontSize: 20, fontWeight: "bold", color: "#febd69", fontStyle: "italic" },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    minWidth: 120,
  },
  searchIcon: { fontSize: 14, marginRight: 6 },
  searchInput: { flex: 1, fontSize: 14, color: "#111", padding: 0, ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}) as any },
  topBarActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  topBarBtn: { position: "relative", padding: 4 },
  topBarIcon: { fontSize: 20, color: "#fff" },
  topBarSmallText: { color: "#ccc", fontSize: 12, fontWeight: "600" },
  badge: {
    position: "absolute", top: -4, right: -8,
    backgroundColor: "#f08804", borderRadius: 9, minWidth: 18, height: 18,
    alignItems: "center", justifyContent: "center", paddingHorizontal: 4,
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "bold" },

  // Category bar
  categoryBar: { backgroundColor: "#232f3e", paddingVertical: 8 },
  categoryScroll: { paddingHorizontal: 12, gap: 8 },
  categoryPill: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: "#555" },
  categoryPillActive: { backgroundColor: "#fff", borderColor: "#fff" },
  categoryText: { color: "#ddd", fontSize: 13, fontWeight: "500" },
  categoryTextActive: { color: "#131921", fontWeight: "700" },

  // Banner
  bannerSlide: { height: 200, position: "relative" },
  bannerImage: { width: "100%", height: "100%", position: "absolute" },
  bannerOverlay: {
    flex: 1, justifyContent: "center", paddingLeft: 30,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  bannerTitle: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  bannerSubtitle: { fontSize: 16, color: "#ddd", marginTop: 4 },
  bannerBtn: {
    backgroundColor: "#febd69", paddingHorizontal: 20, paddingVertical: 8,
    borderRadius: 20, alignSelf: "flex-start", marginTop: 12,
  },
  bannerBtnText: { color: "#131921", fontWeight: "bold", fontSize: 14 },
  bannerDots: { flexDirection: "row", justifyContent: "center", paddingVertical: 8, gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#ccc" },
  dotActive: { backgroundColor: "#131921", width: 20 },

  // Section
  sectionHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 14, paddingTop: 16, paddingBottom: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#0f1111" },
  resultCount: { fontSize: 13, color: "#565959" },

  // Grid
  grid: { flexDirection: "row", flexWrap: "wrap" },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  imageWrap: { width: "100%", aspectRatio: 1, backgroundColor: "#f7f7f7", position: "relative" },
  productImage: { width: "100%", height: "100%" },
  discountBadge: {
    position: "absolute", top: 8, left: 0,
    backgroundColor: "#cc0c39", paddingHorizontal: 8, paddingVertical: 3,
    borderTopRightRadius: 4, borderBottomRightRadius: 4,
  },
  discountText: { color: "#fff", fontSize: 11, fontWeight: "bold" },
  heartBtn: {
    position: "absolute", top: 8, right: 8,
    backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 16,
    width: 30, height: 30, alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 2,
    elevation: 2,
  },
  cardBody: { padding: 10 },
  productName: { fontSize: 13, color: "#0f1111", lineHeight: 18 },
  priceRow: { flexDirection: "row", alignItems: "baseline", marginTop: 4, gap: 6 },
  price: { fontSize: 18, fontWeight: "bold", color: "#0f1111" },
  originalPrice: { fontSize: 12, color: "#565959", textDecorationLine: "line-through" },
  primeBadge: {
    backgroundColor: "#232f3e", alignSelf: "flex-start",
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, marginTop: 6,
  },
  primeText: { color: "#00a8e1", fontSize: 11, fontWeight: "bold", fontStyle: "italic" },

  // No results
  noResults: { padding: 40, alignItems: "center" },
  noResultsText: { fontSize: 16, color: "#565959" },
});
