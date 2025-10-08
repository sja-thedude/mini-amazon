import React, { useState } from "react";
import { View } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { Product } from "../types/product";

export default function AddProduct({ navigation }: any) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price: Number(price),
      description,
      image: "https://via.placeholder.com/150",
    };
    console.log("Added product:", newProduct);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Price" value={price} onChangeText={setPrice} />
      <Input placeholder="Description" value={description} onChangeText={setDescription} />
      <Button title="Add Product" onPress={handleAdd} />
    </View>
  );
}