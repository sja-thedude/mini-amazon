import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Cart() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>Your cart is empty.</Text>
      <Link href="/" asChild>
        <Button title="Back to Home" />
      </Link>
    </View>
  );
}