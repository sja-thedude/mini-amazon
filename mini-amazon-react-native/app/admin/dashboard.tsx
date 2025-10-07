import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Dashboard() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>Admin Dashboard</Text>
      <Link href="/" asChild>
        <Button title="Go Back Home" />
      </Link>
    </View>
  );
}