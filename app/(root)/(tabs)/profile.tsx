import useAuthStore from "@/store/AuthStore";
import { formatDate } from "@/utils/date";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const Profile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const loggedUser = useAuthStore((state) => state.user);
  const handleLogout = () => {
    AsyncStorage.removeItem("accessToken");
    router.navigate("/");
    setUser(undefined);
  };
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="bg-orange-400 h-64 justify-center items-center pt-9">
        <Image
          style={{
            height: 128,
            width: 128,
            borderRadius: 64,
            borderWidth: 4,
            borderColor: "white",
          }}
          source={{ uri: loggedUser?.profileImageURL }}
        />
        <Text className="text-white mt-4 text-2xl font-bold">{loggedUser?.fullName}</Text>
        <Text className="text-white text-base">{loggedUser?.email}</Text>
      </View>

      <View className="p-6">
        <Text className="text-xl font-semibold mb-4">Account Information </Text>

        <View className="flex-row justify-between py-2 border-b border-gray-300">
          <Text className="text-gray-700">Full Name:</Text>
          <Text className="text-gray-500">{loggedUser?.fullName}</Text>
        </View>

        <View className="flex-row justify-between py-2 border-b border-gray-300">
          <Text className="text-gray-700">Email:</Text>
          <Text className="text-gray-500">{loggedUser?.email}</Text>
        </View>

        <View className="flex-row justify-between py-2 border-b border-gray-300">
          <Text className="text-gray-700">Role:</Text>
          <Text className="text-gray-500">{loggedUser?.role}</Text>
        </View>

        <View className="flex-row justify-between py-2 border-b border-gray-300">
          <Text className="text-gray-700">Create Date:</Text>
          <Text className="text-gray-500">{formatDate(new Date(loggedUser?.createdAt))}</Text>
        </View>

        <View className="flex-row justify-between py-2 border-b border-gray-300">
          <Text className="text-gray-700">Update At:</Text>
          <Text className="text-gray-500">{formatDate(new Date(loggedUser?.updatedAt))}</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} className="bg-red-500 mt-6 py-3 rounded-full">
          <Text className="text-center text-white text-lg font-semibold">Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
