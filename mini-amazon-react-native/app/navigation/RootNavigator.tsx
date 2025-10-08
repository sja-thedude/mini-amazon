import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ClientStack from "./ClientStack";
import AdminStack from "./AdminStack";
import { AuthContext } from "../context/AuthContext";

export default function RootNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user?.role === "admin" ? <AdminStack /> : <ClientStack />}
    </NavigationContainer>
  );
}
