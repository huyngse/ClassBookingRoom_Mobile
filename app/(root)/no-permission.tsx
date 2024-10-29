import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "@/store/AuthStore";

const NoPermission = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return (
    <View className="flex-1  justify-center items-center p-5 bg-[#f8f9fa]">
      <Text className="text-xl">Access Denied</Text>
      <Text className=" text-center mb-8">
        You do not have permission to access this resource.
      </Text>
      <Button
        onPress={() => {
          router.replace("/(auth)/sign-in");
          AsyncStorage.removeItem("accessToken");
          setUser(undefined);
        }}
      >
        Go Back
      </Button>
    </View>
  );
};

export default NoPermission;
