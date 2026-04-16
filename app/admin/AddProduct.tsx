import React, { useState, useContext } from "react";
import { ScrollView, Alert, Text, TextInput, TouchableOpacity, StyleSheet, useWindowDimensions, View, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Product } from "../types/product";
import { ProductContext } from "../context/ProductContext";
import { useRouter } from "expo-router";

const CATEGORIES = ["Electronics", "Fashion", "Home"];

export default function AddProduct() {
  const router = useRouter();
  const { addProduct } = useContext(ProductContext);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Electronics");

  const formWidth = Math.min(width - 40, 500);

  const handleAdd = () => {
    if (!name || !price || !description) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      description,
      image: image || "https://via.placeholder.com/400",
      category,
      rating: 0,
      reviewCount: 0,
      prime: true,
    };

    addProduct(newProduct);
    Alert.alert("Success", `${name} has been added to the store.`);
    router.back();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Product</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 30 }]} keyboardShouldPersistTaps="handled">
        <View style={[styles.card, { width: formWidth, alignSelf: "center" }]}>
          <Text style={styles.label}>Product Name *</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Wireless Bluetooth Earbuds" />

          <Text style={styles.label}>Category *</Text>
          <View style={styles.catRow}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                style={[styles.catOption, category === cat && styles.catSelected]}
              >
                <Text style={[styles.catText, category === cat && styles.catTextSelected]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Price *</Text>
          <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="49.99" />

          <Text style={styles.label}>Original Price (optional)</Text>
          <TextInput style={styles.input} value={originalPrice} onChangeText={setOriginalPrice} keyboardType="numeric" placeholder="79.99" />

          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your product..."
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Image URL (optional)</Text>
          <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="https://..." />

          <TouchableOpacity style={styles.submitBtn} onPress={handleAdd}>
            <Text style={styles.submitText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 14, paddingBottom: 8, backgroundColor: "#131921",
  },
  backText: { color: "#febd69", fontSize: 16, fontWeight: "600" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },

  scrollContent: { padding: 14 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" },

  label: { fontSize: 13, fontWeight: "bold", color: "#0f1111", marginTop: 14, marginBottom: 4 },
  input: {
    borderWidth: 1, borderColor: "#a6a6a6", borderRadius: 4, padding: 10, fontSize: 14, backgroundColor: "#fff",
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}) as any,
  },
  textArea: { minHeight: 80, textAlignVertical: "top" },

  catRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  catOption: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 16, borderWidth: 1, borderColor: "#d5d9d9", backgroundColor: "#f0f2f2" },
  catSelected: { borderColor: "#e77600", backgroundColor: "#fef8f2" },
  catText: { fontSize: 13, color: "#0f1111" },
  catTextSelected: { color: "#c45500", fontWeight: "600" },

  submitBtn: { backgroundColor: "#ffd814", paddingVertical: 12, borderRadius: 20, alignItems: "center", marginTop: 20 },
  submitText: { fontWeight: "bold", fontSize: 15, color: "#0f1111" },
});
