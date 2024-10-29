import { getAllBookingRequest } from '@/lib/api/booking-api';
import { Booking } from '@/types/Booking';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Pressable } from 'react-native';

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch booking data
  const fetchBookings = async () => {
    setLoading(true);
    const response = await getAllBookingRequest();
    if (response.success) {
      setBookings(response.data);
    }
    setLoading(false);
  };

  // Approve and Deny Handlers
  const handleApprove = (id: number) => {
    // Approve logic
    console.log(`Approved booking with ID: ${id}`);
  };

  const handleDeny = (id: number) => {
    // Deny logic
    console.log(`Denied booking with ID: ${id}`);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Render Item
  const renderBooking = ({ item }: { item: Booking }) => (
    <View className="p-4 my-2 border border-gray-300 rounded-lg">
      <Text className="text-lg font-bold">Booking Code: {item.code}</Text>
      {/* <Text>Status</Text> */}

      <View
      className={`${
        item.status === 'Pending' ? 'bg-yellow-300' : 'bg-green-300'
      } py-1 px-2 rounded-full w-auto mt-2`}
    >
      <Text className="text-black text-center font-semibold">{item.status}</Text>
    </View>
      <Text>Student: {item.studentFullName}</Text>
      <Text>Email: {item.studentEmail}</Text>
      <Text>Activity: {item.activityName}</Text>
      <Text>Department: {item.departmentName}</Text>
      <Text>Room: {item.roomName}</Text>
      <Text>Booking Date: {new Date(item.bookingDate).toLocaleString()}</Text>
      <Text>Created At: {new Date(item.createdAt).toLocaleString()}</Text>
      <View className="flex-row justify-around mt-3">
        <Pressable onPress={() => handleApprove(item.id)} className="bg-blue-500 py-2 px-4 rounded">
          <Text className="text-white">Approve</Text>
        </Pressable>
        <Pressable onPress={() => handleDeny(item.id)} className="bg-red-500 py-2 px-4 rounded">
          <Text className="text-white">Deny</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-white">
      <View className='flex items-center pt-9'>
      <Text className="text-2xl font-bold mb-4">Booking Manager</Text>

      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Bookings;
