// app/screens/Admin/Dashboard.tsx
import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Admin Dashboard</Text>
      <Button title="Add Product" onPress={() => alert("Add Product Page")} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
