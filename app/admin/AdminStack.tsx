// app/admin/AdminStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./dashboard";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

export type AdminStackParamList = {
  Dashboard: undefined;
  AddProduct: undefined;
  EditProduct: { product: any };
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminStack() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
    </Stack.Navigator>
  );
}
