import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";

const Home = ({ navigation }: { navigation: any }) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [apiData, setAPIData] = useState<
    { text: string; author: string } | undefined
  >(undefined);

  useEffect(() => {
    pullData();
  }, []);
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

  const url = "https://stoic-quotes.com/api/quote";
  const pullData = async () => {
    let urlResult = await fetch(url);
    let myData = (await urlResult).json();
    setAPIData(await myData);
    console.log(myData);
  };

  const refreshFunction = () => {
    pullData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  };

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <GestureHandlerRootView>
        <ScrollView
          style={{ height: "100%" }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshFunction}
            />
          }
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              borderRadius: 10,
              borderWidth: 1,
              marginVertical: 10,
              height: 215,
              paddingHorizontal: 10,
            }}
          >
            {apiData ? (
              <View>
                <Text style={{ fontSize: 20 }}>{apiData.text}</Text>
                <Text
                  style={{
                    fontSize: 20,
                    paddingTop: 10,
                    alignContent: "flex-end",
                    textAlign: "right",
                    alignItems: "flex-end",
                  }}
                >
                  {apiData.author}
                </Text>
              </View>
            ) : null}
          </View>
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
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
