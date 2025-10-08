import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../admin/dashboard";
import AddProduct from "../admin/AddProduct";
import EditProduct from "../admin/EditProduct";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
    </Stack.Navigator>
  );
}
