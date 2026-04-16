// App.tsx
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import RoleSelection from "./screens/Auth/RoleSelection";
import AdminDashboard from "./admin/dashboard";
import ClientHome from "./screens/Home";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If no user logged in, show the role selection / login
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RoleSelection" component={RoleSelection} />
      </Stack.Navigator>
    );
  }

  // If user exists, show dashboard based on role
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.role === "admin" ? (
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      ) : (
        <Stack.Screen name="ClientHome" component={ClientHome} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
