import { Tabs } from "expo-router";
import React, { ReactNode } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Octicons } from "@expo/vector-icons";
const TabIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ReactNode;
}) => {
  return (
    <View
      className={`flex-row justify-center items-center rounded-ful ${
        focused && "bg-green-300"
      }`}
    >
      <View
        className={`rounded-full w-12 h-12 items-center justify-center ${
          focused && "bg-green-400"
        }`}
      >
        {source}
      </View>
    </View>
  );
};
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={`${focused ? "#4ade80" : "#6b7280"}`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="room"
        options={{
          title: "Rooms",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="building"
              size={24}
              color={`${focused ? "#4ade80" : "#6b7280"}`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="student"
        options={{
          title: "Students",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="group"
              size={24}
              color={`${focused ? "#4ade80" : "#6b7280"}`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "Reports",
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="report"
              size={24}
              color={`${focused ? "#4ade80" : "#6b7280"}`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profiles",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="person-circle-sharp"
              size={24}
              color={`${focused ? "#4ade80" : "#6b7280"}`}
            />
          ),
        }}
      />
    </Tabs>
  );
}
