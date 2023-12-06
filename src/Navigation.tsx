import React from "react";
import LoginScreen from "./screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import EmployeesScreen from "./screens/EmployeesScreen";
import EmployeeCreateScreen from "./screens/EmployeeCreateScreen";
import EmployeeSingleScreen from "./screens/EmployeeSingleScreen";
import { useSelector } from "react-redux";
import Employee from "./types/employee.type";

const Stack = createNativeStackNavigator();

export default () => {
  const employee = useSelector((state: any) => state.employee.data as Employee)
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => { return null } }} />
      <Stack.Screen name="Employees" component={EmployeesScreen} options={{ title: "Employee List", headerLeft: () => { return <></> } }} />
      <Stack.Screen name="EmployeeSingle" component={EmployeeSingleScreen} options={{ title: employee.id?"Employee Details":"Create Employee" }} />
    </Stack.Navigator>
  </NavigationContainer>
}