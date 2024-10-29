import React, { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getAllBookingRequest } from "@/lib/api/booking-api";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "expo-router";
import Loader from "@/components/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingCard from "@/components/BookingCard";
import { Booking } from "@/types/booking";

const BookingScreen = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const bookingResult = await getAllBookingRequest();
    if (bookingResult.error) {
      Toast.show({
        text1: "Error",
        text2: bookingResult.error,
        position: "top",
      });
    } else {
      setBookings(bookingResult.data);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isLoading) return <Loader />;

  return (
    <SafeAreaView className="flex-1">
      <Text className="text-3xl pt-5 font-bold text-center my-3">Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => `booking-${item.id}`}
        renderItem={({ item }) => <BookingCard booking={item} fetchData={fetchData} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default BookingScreen;
