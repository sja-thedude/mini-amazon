// app/screens/Cart.tsx
import React, { useContext } from "react";
import { View, FlatList, Text } from "react-native";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import Button from "../components/Button";

export default function Cart({ navigation }: any) {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CartItem product={item} onRemove={removeFromCart} />}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total: ${total}</Text>
      <Button title="Checkout" onPress={() => navigation.navigate("Checkout")} />
      <Button title="Clear Cart" onPress={clearCart} color="red" />
    </View>
  );
}
