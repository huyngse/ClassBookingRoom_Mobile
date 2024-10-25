import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const UserLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
      <Stack.Screen name="create" />
      <Stack.Screen name="update" />
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default UserLayout;
