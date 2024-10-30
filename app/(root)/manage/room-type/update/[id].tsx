import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { RoomTypes } from "@/types/room-type";
import { getRoomById } from "@/lib/api/room-api";
import { Button, TextInput } from "react-native-paper";
import { getRoomTypeById, updateRoomType } from "@/lib/api/room-type-api";
import Toast from "react-native-toast-message";
import Loader from "@/components/Loader";
import { useRoute } from "@react-navigation/native";

const UpdateRoomType = () => {
  const route = useRoute();
  const [roomType, setRoomType] = useState<RoomTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const { id } = useLocalSearchParams<{ id: string }>();
  const fetchData = async () => {
    if (id == null) return;
    setIsLoading(true);
    const { data, error } = await getRoomTypeById(parseInt(id));
    if (!error) {
      setRoomType(data);
    } else {
      setError(error);
    }
    setIsLoading(false);
  };

  const handleUpdateRoom = async () => {
    if (roomType == null) return;
    if (name.length == 0) {
      setError("Name cannot be empty");
      return;
    }
    const createResult = await updateRoomType(roomType.id, { name: name });
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
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  useEffect(() => {
    if (roomType != null) {
      setName(roomType.name);
    }
  }, [roomType]);
  if (isLoading) {
    return <Loader />;
  }
  if (!isLoading && id == null) return;
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
          {error && <Text className="text-red-500">{error}</Text>}
        </View>
      </ScrollView>
      <Button mode="contained" onPress={handleUpdateRoom}>
        Update
      </Button>
    </View>
  );
};

export default UpdateRoomType;
