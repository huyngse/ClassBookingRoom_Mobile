import { FontAwesome } from "@expo/vector-icons";
import { addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

interface RoomData {
  id?: string;
  name: string;
  status: string;
  bookings?: number;
  icon: string;
}

const roomsData: RoomData[] = [
  { id: "1", name: "Room 101", status: "Empty", icon: "check" },
  {
    id: "2",
    name: "Room 102",
    status: "Accepted booking",
    bookings: 1,
    icon: "book",
  },
  { id: "3", name: "Room 103", status: "Empty", icon: "check" },
  { id: "4", name: "Room 104", status: "Empty", icon: "check" },
  { id: "5", name: "Room 105", status: "Maintained", icon: "wrench" },
  { id: "6", name: "Room 106", status: "Empty", icon: "check" },
  { id: "7", name: "Room 107", status: "Empty", icon: "check" },
  {
    id: "8",
    name: "Room 108",
    status: "Accepted booking",
    bookings: 2,
    icon: "book",
  },
  {
    id: "9",
    name: "Room 109",
    status: "Accepted booking",
    bookings: 2,
    icon: "book",
  },
  { id: "10", name: "Room 110", status: "Empty", icon: "check" },
  {
    id: "11",
    name: "Room 111",
    status: "Accepted booking",
    bookings: 3,
    icon: "book",
  },
  {
    id: "12",
    name: "Room 112",
    status: "Accepted booking",
    bookings: 2,
    icon: "book",
  },
  { id: "13", name: "Room 113", status: "Closed", icon: "times" },
];

const RoomCard: React.FC<RoomData> = ({ name, status, bookings, icon }) => (
  <View className="bg-gray-200 rounded-lg flex-row items-center p-5 gap-3 my-1">
    <Icon name={icon} size={24} color="#333" />
    <View>
      <Text className="font-bold text-lg">{name}</Text>
      {bookings ? (
        <Text className="text-gray-900 mt-1">{bookings} Pending booking</Text>
      ) : (
        <Text className="text-sm text-gray-800 mt-1">{status}</Text>
      )}
    </View>
  </View>
);

const Room: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const getWeeks = () => {
    const weeks = [];
    for (let i = -2; i <= 2; i++) {
      const weekStart = startOfWeek(addWeeks(new Date(), i));
      weeks.push(weekStart);
    }
    return weeks;
  };

  const weeks = getWeeks();

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
        <Text className="font-semibold">Only show room with pending Booking</Text>
      </View>
      <FlatList
        data={roomsData}
        keyExtractor={(item) => item.id || `room-${item.name}`} // Đảm bảo trả về một chuỗi duy nhất
        renderItem={({ item }) => (
          <RoomCard
            name={item.name}
            status={item.status}
            bookings={item.bookings}
            icon={item.icon}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Room;
