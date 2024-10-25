import { getAllRoom } from "@/lib/api/room-api";
import { Room as RoomType } from "@/types/room";
import { FontAwesome } from "@expo/vector-icons";
import { addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Card, Checkbox, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const RoomCard = ({ room }: { room: RoomType }) => (
  <View className="mb-5">
    <Card>
      <Card.Cover source={{ uri: room.picture }} />
      <View className="p-3">
        <Text className="text-2xl font-semibold">Room {room.roomName}</Text>
        <Text className="text-lg">{room.roomType.name}</Text>
        <Text className="">Pending booking: {room.numOfPendingBooking}</Text>
      </View>
    </Card>
  </View>
);

const Room = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getWeeks = () => {
    const weeks = [];
    for (let i = -2; i <= 2; i++) {
      const weekStart = startOfWeek(addWeeks(new Date(), i));
      weeks.push(weekStart);
    }
    return weeks;
  };

  const weeks = getWeeks();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const roomResult = await getAllRoom();
      if (roomResult.error) {
        Toast.show({
          text1: "Error",
          text2: roomResult.error,
          position: "top",
        });
      } else {
        setRooms(roomResult.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <Text className="text-3xl font-bold text-center my-3">Rooms</Text>
      <View className="bg-gray-200 rounded-xl flex-row px-4 py-2 items-center my-2">
        {/* Search icon */}
        <FontAwesome name="search" size={18} className="" />
        {/* Search coffee input */}
        <TextInput
          placeholder="Search room..."
          value={searchValue}
          onChangeText={(value: string) => setSearchValue(value)}
          className="ml-2 flex-1 text-black"
        />
      </View>

      <View className="py-2">
        <FlatList
          data={weeks}
          keyExtractor={(item) => item.toString()}
          horizontal
          contentContainerStyle={{ gap: 4 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedWeek(item)}
              className=""
            >
              <Text
                className={`${
                  item.getTime() == selectedWeek.getTime()
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                } font-semibold px-2 py-1 rounded`}
              >
                {format(item, "dd/MM")} - {format(endOfWeek(item), "dd/MM")}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View className="flex-row items-center">
        <Checkbox
          status={showPendingOnly ? "checked" : "unchecked"}
          onPress={() => {
            setShowPendingOnly(!showPendingOnly);
          }}
        />
        <Text className="font-semibold">
          Only show room with pending Booking
        </Text>
      </View>
      <FlatList
        data={rooms}
        keyExtractor={(item) => `room-${item.id}`}
        renderItem={({ item }) => <RoomCard room={item} />}
      />
    </SafeAreaView>
  );
};

export default Room;
