import React from "react";
import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { Product } from "../types/product";

const products: Product[] = [
  { id: "1", name: "Shoes", description: "Nice shoes", price: 50, image: "https://images.unsplash.com/photo-1583433509737-4b1e52a75535" },
  { id: "2", name: "Bag", description: "Cool bag", price: 30, image: "https://images.unsplash.com/photo-1585386959984-a415522c3e20" },
  { id: "3", name: "Watch", description: "Stylish watch", price: 120, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  { id: "4", name: "Hat", description: "Trendy hat", price: 20, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246" },
  { id: "5", name: "Sunglasses", description: "Cool shades", price: 45, image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439" },
  { id: "6", name: "Jacket", description: "Warm jacket", price: 90, image: "https://images.unsplash.com/photo-1593032465179-1d888fc2f470" },
  { id: "7", name: "Laptop", description: "Powerful laptop", price: 1000, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
  { id: "8", name: "Headphones", description: "Noise-cancelling", price: 80, image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167" },
  { id: "9", name: "Camera", description: "DSLR camera", price: 500, image: "https://images.unsplash.com/photo-1519183071298-a2962d0c7f7c" },
  { id: "10", name: "Phone", description: "Latest smartphone", price: 800, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
  { id: "11", name: "Tablet", description: "Fast tablet", price: 400, image: "https://images.unsplash.com/photo-1555617117-08a5b66d5f60" },
  { id: "12", name: "Shoes 2", description: "Sporty shoes", price: 60, image: "https://images.unsplash.com/photo-1562158070-969efb0b86d2" },
];

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const itemWidth = screenWidth / numColumns - 20;

export default function Home() {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <View
          style={{
            width: itemWidth,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Image source={{ uri: item.image }} style={{ width: itemWidth - 20, height: 120 }} />
          <Text style={{ fontWeight: "bold", marginTop: 5 }}>{item.name}</Text>
          <Text>${item.price}</Text>
        </View>
      )}
    />
  );
}
