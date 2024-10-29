import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { Room } from "@/types/room";
import { getBookingByRoomId, getRoomById } from "@/lib/api/room-api";
import { Booking } from "@/types/booking";
import Toast from "react-native-toast-message";
import { RoomTypes } from "@/types/room-type";
import { getRoomTypeById } from "@/lib/api/room-type-api";
import { formatDate, toLocalDate } from "@/utils/date";
import { formatDateToTimeString } from "@/utils/time";
import Loader from "@/components/Loader";
import BookingCard from "@/components/BookingCard";

const RoomDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [roomDetail, setRoomDetail] = useState<Room>();
  const [roomType, setRoomType] = useState<RoomTypes>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const fetchData = async () => {
    setIsLoading(true);
    if (id) {
      const roomDetailResult = await getRoomById(parseInt(id));
      if (roomDetailResult.error) {
        Toast.show({
          text1: "Error",
          text2: roomDetailResult.error,
          position: "top",
        });
      } else {
        setRoomDetail(roomDetailResult.data);
        const roomTypeResult = await getRoomTypeById(
          roomDetailResult.data.roomType.id
        );
        if (roomTypeResult.error) {
          Toast.show({
            text1: "Error",
            text2: roomTypeResult.error,
            position: "top",
          });
        } else {
          setRoomType(roomTypeResult.data);
        }
      }
      const bookingsResult = await getBookingByRoomId(parseInt(id));
      if (bookingsResult.error) {
        Toast.show({
          text1: "Error",
          text2: bookingsResult.error,
          position: "top",
        });
      } else {
        setBookings(
          bookingsResult.data.filter(
            (booking: Booking) => booking.status == "Pending"
          )
        );
      }
    }
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  if (isLoading) return <Loader />;
  if (roomDetail == null) return <Text>Null</Text>;
  return (
    <ScrollView>
      <View className="">
        <Image
          source={{ uri: roomDetail?.picture }}
          className="h-[200px] w-full rounded-lg object-cover"
        />
        <View className="p-4">
          <View className="flex">
            <Text className="text-4xl font-semibold">
              Room {roomDetail?.roomName}
            </Text>
          </View>
          <View className="text-sm text-gray-500">
            <Text>
              Created at: {formatDate(toLocalDate(roomDetail?.createdAt), true)}
            </Text>
            <Text>
              Updated at: {formatDate(toLocalDate(roomDetail?.updatedAt), true)}
            </Text>
          </View>
          <Text className="">
            <Text className="font-semibold">Type: </Text>
            {roomDetail?.roomType.name}
          </Text>
          <Text className="">
            <Text className="font-semibold">Capacity: </Text>
            {roomDetail?.capacity}
          </Text>
          <View className="flex-row">
            <Text className="font-semibold">Allowed cohort: </Text>
            <View className="flex-row gap-1">
              {roomType?.allowedCohorts.map((cohort) => {
                return (
                  <Text
                    className={`bg-orange-500 px-2 py-1 text-white rounded`}
                    key={`allowed-cohort-${cohort.id}`}
                  >
                    {cohort.cohortCode}
                  </Text>
                );
              })}
              {roomType?.allowedCohorts.length == 0 && <Text>None</Text>}
            </View>
          </View>
          <Text className="font-semibold">
            Status: <Text>{roomDetail?.status}</Text>
          </Text>
          <Text className="">
            <Text className="font-semibold">Number of slots: </Text>
            {roomDetail?.roomSlots?.length} (slot)
          </Text>
          <View className="mt-2">
            <Text className="text-lg font-semibold">Slots</Text>
            {roomDetail?.roomSlots.map((slot) => {
              return (
                <Text
                  key={`slot-${slot.id}`}
                  className="bg-orange-500 text-white p-2 rounded mb-1 font-semibold"
                >
                  {formatDateToTimeString(slot.startTime)} -{" "}
                  {formatDateToTimeString(slot.endTime)}
                </Text>
              );
            })}
            {
              roomDetail?.roomSlots.length == 0 && <Text>This room has no slot</Text>
            }
          </View>
          <View className="mt-2">
            <Text className="text-lg font-semibold">Pending bookings</Text>
            {bookings.map((booking) => {
              return (
                <BookingCard booking={booking} key={`booking-${booking.id}`} />
              );
            })}
             {
              bookings.length == 0 && <Text>This room has no pending booking</Text>
            }
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RoomDetail;
