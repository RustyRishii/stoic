import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import auth, { firebase } from "@react-native-firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Pressable,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { BottomTabs } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const Stack = createStackNavigator();

export default function EmailPassAuth({ navigation }: { navigation: any }) {
  const [stored, setStored] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const storeData = async (email: string, password: string) => {
    try {
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("password", password);
    } catch (error) {
      console.error("Error storing user data", error);
    }
  };

 

  const createUser = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log("User account created");
      ToastAndroid.show("Account created", ToastAndroid.SHORT);
      //navigation.navigate("Home");
      navigation.navigate("BottomTabs", { screen: "Home" });
      //Email and password to store in the Async storage.
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        ToastAndroid.show("Email already in use", ToastAndroid.SHORT);
      }
      if (error.code === "auth/invalid-email") {
        ToastAndroid.show("Email Invalid", ToastAndroid.SHORT);
      }
      console.error(error);
    }
  };
  const signInUser = async () => {
    // Add email, password, and navigation parameters
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      ); // Use await to wait for the signInWithEmailAndPassword method to complete
      console.log("User Signed In", userCredential.user.email); // Log the signed-in user's email
      navigation.navigate("BottomTabs", { screen: "Home" });
    } catch (error: any) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        // Check for user-not-found or wrong-password errors
        ToastAndroid.show("Invalid email or password", ToastAndroid.SHORT); // Show a toast message for invalid credentials
      } else {
        ToastAndroid.show("Could not sign in", ToastAndroid.SHORT); // Show a generic sign-in error message
      }
      console.error(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <View
          style={{
            padding: 10,
            //justifyContent: "center",
          }}
        >
          <StatusBar backgroundColor="black" style="light" />
          <View>
            <View>
              <Image
                style={{
                  marginVertical: 25,
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
                source={require("../assets/MovieToEmoji.png")}
              />
            </View>
            <Text>Email</Text>
            <TextInput
              autoFocus={true}
              placeholder="Enter Email"
              value={email}
              keyboardType="email-address"
              onChangeText={(txt) => {
                setEmail(txt);
                setEmail;
              }}
              style={{
                width: "100%",
                height: 50,
                marginVertical: 10,
                borderWidth: 0.5,
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
            />
          </View>
          <View>
            <Text>Password</Text>
            <View>
              <TextInput
                placeholder="Enter Password"
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={(txt) => {
                  setPassword(txt);
                  setPassword;
                }}
                style={{
                  width: "100%",
                  height: 50,
                  borderWidth: 0.5,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
                style={{ marginLeft: 10 }}
                onPress={toggleShowPassword}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginVertical: 10,
              width: "100%",
              borderRadius: 10,
              backgroundColor: "black",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              createUser();
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 10,
              width: "100%",
              borderRadius: 10,
              backgroundColor: "black",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              signInUser();
              storeData(email, password);
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Sign In</Text>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              borderColor: "gray",
              borderWidth: 1.5,
            }}
          />
          <Text
            style={{
              justifyContent: "center",
              alignSelf: "center",
              fontSize: 20,
            }}
          >
            Or
          </Text>
          <Pressable
            onPress={() => console.log("Sign In with Google")}
            style={{
              marginVertical: 20,
              flexDirection: "row",
              borderWidth: 1,
              backgroundColor: "black",
              borderRadius: 10,
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                justifyContent: "center",
                marginHorizontal: 10,
              }}
              source={require("../assets/google.png")}
            />
            <Text style={{ fontSize: 25, color: "white" }}>
              Sign in with Google
            </Text>
          </Pressable>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
