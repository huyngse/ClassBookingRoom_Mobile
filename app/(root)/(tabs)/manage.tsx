import { View, Text, TouchableHighlight, Pressable, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { List, TouchableRipple } from "react-native-paper";

const ManageMenu = () => {
  return (
    <SafeAreaView>
      <Text className="text-2xl text-center p-2">Manage Menu</Text>
      <ScrollView>
        <Pressable
          android_ripple={{ color: "rgb(200,200,200)" }}
          onPress={() => router.navigate("/(root)/manage/department")}
        >
          <List.Item
            title="Departments"
            description="Manage departments"
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
        </Pressable>
        <Pressable
          android_ripple={{ color: "rgb(200,200,200)" }}
          onPress={() => router.navigate("/(root)/manage/report")}
        >
          <List.Item
            title="Reports"
            description="Manage reports"
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
        </Pressable>
        <Pressable
          android_ripple={{ color: "rgb(200,200,200)" }}
          onPress={() => router.navigate("/(root)/manage/room")}
        >
          <List.Item
            title="Rooms"
            description="Manage rooms"
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
        </Pressable>
        <Pressable
          android_ripple={{ color: "rgb(200,200,200)" }}
          onPress={() => router.navigate("/(root)/manage/room-type")}
        >
          <List.Item
            title="Room Types"
            description="Manage room types"
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
        </Pressable>
        <Pressable
          android_ripple={{ color: "rgb(200,200,200)" }}
          onPress={() => router.navigate("/(root)/manage/user")}
        >
          <List.Item
            title="Users"
            description="Manage users"
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageMenu;
