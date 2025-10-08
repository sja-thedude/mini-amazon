import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { Product } from "../types/product";
import { useRouter } from "expo-router"; // ✅ Import useRouter

export default function AddProduct() {
  const router = useRouter(); // ✅ use router instead of navigation prop

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = () => {
    if (!name || !price || !description) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price: Number(price),
      description,
      image: image || "https://via.placeholder.com/150",
    };

    console.log("Added product:", newProduct);

    // TODO: Save product to global state or backend

    router.back(); // ✅ Go back to previous page
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <Input placeholder="Description" value={description} onChangeText={setDescription} />
      <Input placeholder="Image URL" value={image} onChangeText={setImage} />
      <Button title="Add Product" onPress={handleAdd} />
    </ScrollView>
  );
}
