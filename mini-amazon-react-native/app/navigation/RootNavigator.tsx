import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import AdminStack from "./AdminStack";
import ClientStack from "./ClientStack";
import RoleSelection from "../screens/Auth/RoleSelection";

const Stack = createNativeStackNavigator();

export default function RouteNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="RoleSelection" component={RoleSelection} />
      ) : user.role === "admin" ? (
        <Stack.Screen name="AdminStack" component={AdminStack} />
      ) : (
        <Stack.Screen name="ClientStack" component={ClientStack} />
      )}
    </Stack.Navigator>
  );
}
