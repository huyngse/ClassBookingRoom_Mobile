import React from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Làm cho id không bắt buộc
interface RoomData {
  id?: string;
  name: string;
  status: string;
  bookings?: number;
  icon: string;
}

const roomsData: RoomData[] = [
  { id: "1", name: "Room 101", status: "Empty", icon: "check" },
  { id: "2", name: "Room 102", status: "Accepted booking", bookings: 1, icon: "book" },
  { id: "3", name: "Room 103", status: "Empty", icon: "check" },
  { id: "4", name: "Room 104", status: "Empty", icon: "check" },
  { id: "5", name: "Room 105", status: "Maintained", icon: "wrench" },
  { id: "6", name: "Room 106", status: "Empty", icon: "check" },
  { id: "7", name: "Room 107", status: "Empty", icon: "check" },
  { id: "8", name: "Room 108", status: "Accepted booking", bookings: 2, icon: "book" },
  { id: "9", name: "Room 109", status: "Accepted booking", bookings: 2, icon: "book" },
  { id: "10", name: "Room 110", status: "Empty", icon: "check" },
  { id: "11", name: "Room 111", status: "Accepted booking", bookings: 3, icon: "book" },
  { id: "12", name: "Room 112", status: "Accepted booking", bookings: 2, icon: "book" },
  { id: "13", name: "Room 113", status: "Closed", icon: "times" },
];

const RoomCard: React.FC<RoomData> = ({ name, status, bookings, icon }) => (
  <View className="bg-gray-200 rounded-lg justify-center items-center w-1/3 p-5 mb-4">
    <Icon name={icon} size={24} color="#333" />
    <Text className="mt-2 font-bold text-lg">{name}</Text>
    {bookings ? <Text className="text-xl font-bold text-gray-900 mt-1">{bookings}</Text> : null}
    <Text className="text-sm text-gray-800 mt-1">{status}</Text>
  </View>
);

const Room: React.FC = () => {
  return (
    <View className="flex-1 bg-white px-5">
      <Text className="text-3xl font-bold text-center my-3">Rooms</Text>
      <TextInput
        className="h-10 border border-gray-300 rounded-lg px-3 mb-3 bg-gray-100"
        placeholder="Search room name"
        placeholderTextColor="#888"
      />
      <View className="flex-row justify-between items-center mb-3">
        <TouchableOpacity>
          <Icon name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Today</Text>
        <TouchableOpacity>
          <Icon name="chevron-right" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center mb-3">
        <Icon name="calendar" size={24} color="#333" />
        <Text className="ml-2 text-lg">22-sep-24</Text>
      </View>
      <FlatList
  data={roomsData}
  keyExtractor={(item) => item.id || `room-${item.name}`} // Đảm bảo trả về một chuỗi duy nhất
  numColumns={3}
  renderItem={({ item }) => (
    <RoomCard name={item.name} status={item.status} bookings={item.bookings} icon={item.icon} />
  )}
  columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }} // Thêm gap giữa các card theo chiều ngang
  contentContainerStyle={{ paddingBottom: 20, rowGap: 20 }} // Thêm khoảng cách giữa các hàng
/>

    </View>
  );
};

export default Room;
