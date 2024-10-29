import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { Booking } from "@/types/booking";
import { getAllBookingRequest } from "@/lib/api/booking-api";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "expo-router";
import Loader from "@/components/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingCard from "@/components/BookingCard";

const booking = () => {
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
    <SafeAreaView>
      <Text className="text-3xl font-bold text-center my-3">Bookings</Text>
      <View className="p-3">
        {bookings.map((booking) => {
          return (
            <BookingCard booking={booking} key={`booking-${booking.id}`} />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default booking;
