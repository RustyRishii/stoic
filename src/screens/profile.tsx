import { ToastAndroid, StyleSheet, Text, Pressable, View } from "react-native";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import auth from "@react-native-firebase/auth";

const Profile = ({ navigation }: { navigation: any }) => {
  const signOutUser = async () => {
    try {
      auth().signOut();
      console.log("User signed out.");
      ToastAndroid.show("User signed out", ToastAndroid.SHORT);
      navigation.navigate("EmailPassAuth");
    } catch (error) {
      if (error === "Cant sign out user") {
        ToastAndroid.show("An error occured", ToastAndroid.SHORT);
      }
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <GestureHandlerRootView style={{ padding: 10 }}>
        <StatusBar backgroundColor="black" style="light" />
        <Text>Profile Page</Text>
        <Pressable
          style={{
            marginVertical: 10,
            width: "100%",
            borderRadius: 10,
            backgroundColor: "black",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => signOutUser()}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Sign out</Text>
        </Pressable>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
