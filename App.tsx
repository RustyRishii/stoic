import { firebase } from "@react-native-firebase/auth";
import { StatusBar } from "expo-status-bar";
import firebaseInfo from "./src/firebaseinfo";
import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons, { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import EmailPassAuth from "./src/EmailPassAuth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/home";
import Bookmark from "./src/screens/bookmark";
import Profile from "./src/screens/profile";

firebase.initializeApp(firebaseInfo);

const Tabs = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelStyle: {
          position: "relative",
          fontSize: 13,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        headerShown: false,
        tabBarActiveBackgroundColor: "white",
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={"black"}
              size={30}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "bookmark" : "bookmark-outline"}
              color={"black"}
              size={30}
            />
          ),
        }}
        name="Bookmark"
        component={Bookmark}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              color={"black"}
              size={30}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tabs.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="EmailPassAuth">
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name="BottomTabs"
        component={BottomTabs}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_left",
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
