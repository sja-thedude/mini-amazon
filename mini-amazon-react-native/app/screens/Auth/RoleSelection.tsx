import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";

export default function RoleSelection() {
  const { login, user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "client">("client");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") router.replace("/admin/dashboard");
      else router.replace("/screens/Home");
    }
  }, [user]);

  const handleLogin = () => {
    login(username, password, role);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Role Selection Login</Text>

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => setRole("admin")}
          style={{
            backgroundColor: role === "admin" ? "blue" : "gray",
            padding: 10,
            borderRadius: 8,
            marginHorizontal: 5,
          }}
        >
          <Text style={{ color: "white" }}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRole("client")}
          style={{
            backgroundColor: role === "client" ? "blue" : "gray",
            padding: 10,
            borderRadius: 8,
            marginHorizontal: 5,
          }}
        >
          <Text style={{ color: "white" }}>Client</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          width: "80%",
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          width: "80%",
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "green",
          padding: 10,
          borderRadius: 8,
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
