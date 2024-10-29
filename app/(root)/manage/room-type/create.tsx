import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { createRoomType } from "@/lib/api/room-type-api";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const CreateRoomType = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleCreateRoomType = async () => {
    if (name.length == 0) {
      setError("Name cannot be empty");
      return;
    }
    const createResult = await createRoomType({ name: name });
    if (createResult.error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: createResult.error,
      });
    } else {
      setTimeout(() => {
        router.back();
      }, 500);
    }
  };
  return (
    <View className="p-3 flex-1">
      <ScrollView className="flex-1">
        <View className="flex-1">
          <Text className="text-2xl font-bold mb-3">Create new room type</Text>
          <TextInput
            label="Room type name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          {
            error && <Text className="text-red-500">{error}</Text>
          }
        </View>
      </ScrollView>
      <Button mode="contained" onPress={handleCreateRoomType}>
        Create
      </Button>
    </View>
  );
};

export default CreateRoomType;
