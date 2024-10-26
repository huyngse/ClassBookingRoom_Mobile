import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import useAuthStore from "@/store/AuthStore";

const RootLayout = () => {
  const loggedUser = useAuthStore((state) => state.user);
  useEffect(() => {
    if (!loggedUser) {
      router.replace("/(auth)/sign-in");
    }
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
