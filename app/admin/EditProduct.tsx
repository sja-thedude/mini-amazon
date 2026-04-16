import React, { useState } from "react";
import { View } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { Product } from "../types/product";

export default function EditProduct({ route, navigation }: any) {
  const { product } = route.params;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [description, setDescription] = useState(product.description);

  const handleSave = () => {
    console.log("Updated product:", { ...product, name, price: Number(price), description });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Price" value={price} onChangeText={setPrice} />
      <Input placeholder="Description" value={description} onChangeText={setDescription} />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}