import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RoomTypeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create" />
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default RoomTypeLayout;
