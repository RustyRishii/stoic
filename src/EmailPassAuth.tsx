import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from "react-native";
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

//const Stack = createStackNavigator();

export default function EmailPassAuth({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const createUser = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log("User account created");
      navigation.navigate("Home");
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

  // const createUser = () => {
  //   auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       console.log(`User account  ${email}  ${password}`);
  //       ToastAndroid.show("Account Created", ToastAndroid.SHORT);
  //     })
  //     .catch((error) => {
  //       if (error.code === "auth/email-already-in-use") {
  //         console.log("That email address is already in use!");
  //       }

  //       if (error.code === "auth/invalid-email") {
  //         console.log("That email address is invalid!");
  //       }

  //       console.error(error);
  //     });
  // };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <View style={{ padding: 10, justifyContent: "center" }}>
          <StatusBar backgroundColor="black" style="light" />
          <View>
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
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
