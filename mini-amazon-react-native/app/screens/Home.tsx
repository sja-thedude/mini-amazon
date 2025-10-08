// app/screens/Home.tsx
import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { Product } from "../types/product";

const products: Product[] = [
  { id: "1", name: "Shoes", description: "Nice shoes", price: 50, image: "https://via.placeholder.com/150" },
  { id: "2", name: "Bag", description: "Cool bag", price: 30, image: "https://via.placeholder.com/150" },
];

export default function Home({ navigation }: any) {
  const { addToCart } = useContext(CartContext);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAddToCart={(p) => addToCart(p)}
          />
        )}
      />
    </View>
  );
}
