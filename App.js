import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import HomeStackNavigator from "./navigation/HomeStackNavigator";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(true); // we’ll use this if we add async storage later

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#E75C1A" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <HomeStackNavigator />
      ) : (
        <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
