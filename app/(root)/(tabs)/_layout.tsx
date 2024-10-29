import { Tabs } from "expo-router";
import React, { ReactNode } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4ade80",
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
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
        name="booking"
        options={{
          title: "bookings",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="book"
              size={24}
              color={`${focused ? "#4ade80" : "#6b7280"}`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          title: "Manage",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings"
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
