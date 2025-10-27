// navigation/AppNavigator.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import HomeStackNavigator from "./HomeStackNavigator";

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate checking if user is logged in
  useEffect(() => {
    // you can replace this later with AsyncStorage or API auth check
    setIsLoggedIn(false); // set to true to skip login for testing
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <HomeStackNavigator />
      ) : (
        <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}
