import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const Bookmark = () => {
  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <StatusBar backgroundColor="black" style="light" />
        <Text>Bookmarks page</Text>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({});
