import React from "react";
import { NativeBaseProvider, Box, Text } from "native-base";
import LoginScreen from "./screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import EmployeesScreen from "./screens/EmployeesScreen";
import EmployeeCreateScreen from "./screens/EmployeeCreateScreen";
import EmployeeSingleScreen from "./screens/EmployeeSingleScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{header:()=>{return null}}}/>
          <Stack.Screen name="Employees" component={EmployeesScreen} options={{title:"Employee List",headerLeft:()=>{return <></>}}}/>
          <Stack.Screen name="EmployeeCreate" component={EmployeeCreateScreen} options={{title:"Create Employee"}}/>
          <Stack.Screen name="EmployeeSingle" component={EmployeeSingleScreen} options={{title:"Employee Details"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}