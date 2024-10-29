import React, { useState } from "react";
import { Text, ScrollView, ActivityIndicator } from "react-native";
import { RoomTypes } from "@/types/room-type";
import { getAllRoomType } from "@/lib/api/room-type-api";
import RoomTypeCard from "@/components/RoomTypeCard";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "@/components/Loader";
import { Button, TouchableRipple } from "react-native-paper";
import useRerender from "@/hooks/useRerender";
import { useFocusEffect } from "expo-router";

const RoomType = () => {
  const [roomTypes, setRoomTypes] = useState<RoomTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchRoomTypes = async () => {
    setLoading(true);
    const { data, error } = await getAllRoomType();
    if (!error) {
      setRoomTypes(data);
    } else {
      setError(error);
    }
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRoomTypes();
    }, [])
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  return (
    <ScrollView className="p-3">
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Manage room types
      </Text>
      <Button className="mb-2" mode="contained">
        Create new room type
      </Button>
      {roomTypes.map((roomType) => (
        <RoomTypeCard
          roomType={roomType}
          key={roomType.id}
          fetchData={fetchRoomTypes}
        />
      ))}
    </ScrollView>
  );
};

export default RoomType;
