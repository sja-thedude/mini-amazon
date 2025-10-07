import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Welcome to Mini Amazon 🛒
      </Text>

      <Link href="/cart" asChild>
        <Button title="Go to Cart" />
      </Link>

      <View style={{ height: 10 }} />

      <Link href="/product" asChild>
        <Button title="View Products" />
      </Link>

      <View style={{ height: 10 }} />

      <Link href="/admin/dashboard" asChild>
        <Button title="Admin Dashboard" />
      </Link>
    </View>
  );
}