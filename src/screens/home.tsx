import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const Home = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [apiData, setAPIData] = useState<
    { text: string; author: string } | undefined
  >(undefined);

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
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
