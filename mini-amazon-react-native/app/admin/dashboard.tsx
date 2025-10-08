// app/admin/Dashboard.tsx
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout, user } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          logout(); // clears context
          // Instead of router.replace, navigate to RoleSelection
          router.replace("/"); // index.tsx will handle redirection to role select
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>Admin Dashboard</Text>
      <Text style={{ fontSize: 18 }}>Hi, {user?.username}</Text>

      <TouchableOpacity
        onPress={() => router.push("/admin/AddProduct")}
        style={{ backgroundColor: "blue", padding: 12, borderRadius: 8, width: "60%", alignItems: "center", marginTop: 20 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Add Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/admin/Orders")}
        style={{ backgroundColor: "orange", padding: 12, borderRadius: 8, width: "60%", alignItems: "center", marginTop: 20 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>View Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={{ backgroundColor: "red", padding: 12, borderRadius: 8, width: "60%", alignItems: "center", marginTop: 20 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
