// app/screens/Checkout.tsx
import React from "react";
import { View, Text } from "react-native";
import Button from "../components/Button";

export default function Checkout({ navigation }: any) {
  const handlePayment = () => {
    alert("Payment successful!");
    navigation.popToTop();
  };

  return (
    <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Checkout</Text>
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
}
