import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAllRoom, deleteRoom } from '@/lib/api/room-api';
import { RoomTypes } from '@/types/room-type';
import Loader from '@/components/Loader';
import { Room } from '@/types/room';
import { router } from 'expo-router';

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [roomToDelete, setRoomToDelete] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await getAllRoom();
      if (!response.error) {
        setRooms(response.data);
      }
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const handleEditRoom = (roomId: number) => {
   router.navigate(`/(root)/manage/room/${roomId}`)
  };

  const handleDeleteRoom = async (id) => {
    const response = await deleteRoom(id);
    if (response.success) {
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
      Toast.show({
        type: 'success',
        text1: 'Room Deleted',
        text2: 'The room has been deleted successfully.',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete room.',
      });
    }
  };

  const renderRoomItem = ({ item }: {item: Room}) => (
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
            className="bg-green-500 px-4 py-2 rounded-md"
            onPress={() => handleEditRoom(item.id)}
          >
            <Text className="text-white font-semibold">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 rounded-md"
            onPress={() => confirmDeleteRoom(item.id)}
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
      <Toast />
    </View>
  );
};

export default Rooms;
