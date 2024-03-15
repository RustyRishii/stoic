import { firebase } from "@react-native-firebase/auth";
import { StatusBar } from "expo-status-bar";
import firebaseInfo from "./src/firebaseinfo";
import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/home";
import Bookmark from "./src/screens/bookmark";
import { NavigationContainer } from "@react-navigation/native";
import EmailPassAuth from "./src/EmailPassAuth";

firebase.initializeApp(firebaseInfo);

//const bottomStack = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="EmailPassAuth">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="EmailPassAuth"
        component={EmailPassAuth}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
