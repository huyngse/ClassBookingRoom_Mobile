import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import useAuthStore from "@/store/AuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RootLayout = () => {
  const loggedUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        router.replace("/(auth)/sign-in");
      }
    };
    check();
    if (loggedUser && loggedUser.role == "Student") {
      router.replace("/(root)/no-permission");
    }
  }, [loggedUser]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="no-permission" />
    </Stack>
  );
};

export default RootLayout;
