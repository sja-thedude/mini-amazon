// app/navigation/ClientStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ProductDetails from "../screens/ProductDetails";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";
import Wishlist from "../screens/Wishlist";

const Stack = createNativeStackNavigator();

export default function ClientStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
    </Stack.Navigator>
  );
}
