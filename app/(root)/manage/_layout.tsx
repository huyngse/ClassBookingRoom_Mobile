import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ManageLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="department"
        options={{ headerTitle: "Departments" }}
      />
      <Stack.Screen name="report" options={{ headerTitle: "Reports" }} />
      <Stack.Screen name="room" options={{ headerTitle: "Room" }} />
      <Stack.Screen name="room-type" options={{ headerTitle: "Room Types" }} />
      <Stack.Screen name="user" options={{ headerTitle: "Users" }} />
    </Stack>
  );
};

export default ManageLayout;
