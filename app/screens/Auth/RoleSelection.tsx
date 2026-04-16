import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";

export default function RoleSelection() {
  const { login, user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "client">("client");
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const formWidth = Math.min(width - 40, 380);

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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 40 }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoRow}>
          <Text style={styles.logoMini}>mini</Text>
          <Text style={styles.logoAmazon}>amazon</Text>
        </View>

        {/* Login card */}
        <View style={[styles.card, { width: formWidth }]}>
          <Text style={styles.cardTitle}>Sign in</Text>

          {/* Role toggle */}
          <Text style={styles.label}>Sign in as</Text>
          <View style={styles.roleRow}>
            <TouchableOpacity
              onPress={() => setRole("client")}
              style={[styles.roleOption, role === "client" && styles.roleSelected]}
            >
              <View style={[styles.radio, role === "client" && styles.radioActive]} />
              <Text style={styles.roleLabel}>Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRole("admin")}
              style={[styles.roleOption, role === "admin" && styles.roleSelected]}
            >
              <View style={[styles.radio, role === "admin" && styles.radioActive]} />
              <Text style={styles.roleLabel}>Admin</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Enter username"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholder="Enter password"
          />

          <TouchableOpacity onPress={handleLogin} style={styles.signInBtn}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            By signing in you agree to Mini Amazon's demo terms of use.
          </Text>
        </View>

        {/* Credentials help */}
        <View style={[styles.credCard, { width: formWidth }]}>
          <View style={styles.credDivider}>
            <View style={styles.credLine} />
            <Text style={styles.credDividerText}>Demo credentials</Text>
            <View style={styles.credLine} />
          </View>
          <View style={styles.credRow}>
            <Text style={styles.credLabel}>Customer:</Text>
            <Text style={styles.credValue}>client / client123</Text>
          </View>
          <View style={styles.credRow}>
            <Text style={styles.credLabel}>Admin:</Text>
            <Text style={styles.credValue}>admin / admin123</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, alignItems: "center", backgroundColor: "#fff" },

  logoRow: { flexDirection: "row", alignItems: "baseline", marginBottom: 24 },
  logoMini: { fontSize: 28, fontWeight: "300", color: "#131921", fontStyle: "italic" },
  logoAmazon: { fontSize: 28, fontWeight: "bold", color: "#131921", fontStyle: "italic" },

  card: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 22, backgroundColor: "#fff",
  },
  cardTitle: { fontSize: 24, fontWeight: "bold", color: "#0f1111", marginBottom: 16 },

  label: { fontSize: 13, fontWeight: "bold", color: "#0f1111", marginBottom: 4, marginTop: 12 },

  roleRow: { flexDirection: "row", gap: 12, marginTop: 4 },
  roleOption: {
    flex: 1, flexDirection: "row", alignItems: "center", gap: 8,
    borderWidth: 1, borderColor: "#d5d9d9", borderRadius: 8, padding: 10, backgroundColor: "#f7fafa",
  },
  roleSelected: { borderColor: "#e77600", backgroundColor: "#fef8f2" },
  radio: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: "#888" },
  radioActive: { borderColor: "#e77600", backgroundColor: "#e77600" },
  roleLabel: { fontSize: 14, color: "#0f1111" },

  input: {
    borderWidth: 1, borderColor: "#a6a6a6", borderRadius: 4,
    padding: 10, fontSize: 14, backgroundColor: "#fff",
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}) as any,
  },

  signInBtn: {
    backgroundColor: "#ffd814", paddingVertical: 10, borderRadius: 8,
    alignItems: "center", marginTop: 18,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1,
  },
  signInText: { fontWeight: "bold", fontSize: 14, color: "#0f1111" },

  terms: { fontSize: 11, color: "#565959", marginTop: 14, lineHeight: 16 },

  credCard: { marginTop: 24, padding: 16 },
  credDivider: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  credLine: { flex: 1, height: 1, backgroundColor: "#e7e7e7" },
  credDividerText: { color: "#767676", fontSize: 12, marginHorizontal: 8 },
  credRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  credLabel: { fontSize: 13, color: "#565959", fontWeight: "600" },
  credValue: { fontSize: 13, color: "#0f1111", fontFamily: Platform.OS === "web" ? "monospace" : "Courier" },
});
