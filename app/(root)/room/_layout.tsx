import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RoomLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="[id]" options={{title: "Room Detail"}} />
    </Stack>
  );
};

export default RoomLayout;
