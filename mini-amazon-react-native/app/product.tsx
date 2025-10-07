import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Product() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>Product Listing Page</Text>
      <Link href="/" asChild>
        <Button title="Go Home" />
      </Link>
    </View>
  );
}