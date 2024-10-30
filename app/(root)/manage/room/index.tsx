import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAllRoom } from '@/lib/api/room-api';
import { RoomTypes } from '@/types/room-type';
import Loader from '@/components/Loader';

const Rooms = () => {
  const [rooms, setRooms] = useState<RoomTypes[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch room data on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await getAllRoom();
      if (response.success) {
        setRooms(response.data);
      }
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const handleEditRoom = (roomId) => {
    console.log(`Edit Room ID: ${roomId}`);
  };

  const handleDeleteRoom = (roomId) => {
    console.log(`Delete Room ID: ${roomId}`);
  };

  const renderRoomItem = ({ item }) => (
    <View className="flex-row my-2 p-3 rounded-lg bg-gray-200">
      <Image source={{ uri: item.picture }} className="w-40 h-full rounded-lg" />
      <View className="flex-1 ml-3 justify-center">
        <Text className="text-lg font-bold">Room: {item.roomName}</Text>
        <Text>Capacity: {item.capacity}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Type: {item.roomType.name}</Text>
        <Text>Pending Bookings: {item.numOfPendingBooking}</Text>
        <View className="flex-row justify-between mt-2">
          <TouchableOpacity
            className="bg-green-600 px-4 py-2 rounded-full"
            onPress={() => handleEditRoom(item.id)}
          >
            <Text className="text-white font-semibold">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-600 px-4 py-2 rounded-full"
            onPress={() => handleDeleteRoom(item.id)}
          >
            <Text className="text-white font-semibold">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-white">
      {loading ? (
        <Loader/>
      ) : (
        <FlatList
          data={rooms}
          renderItem={renderRoomItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Rooms;
