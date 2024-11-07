import React, { useState } from "react";
import { Booking } from "@/types/booking";
import { formatDate, toLocalDate } from "@/utils/date";
import { formatDateToTimeString } from "@/utils/time";
import { Text, View, Modal, TextInput } from "react-native";
import { Button, Card } from "react-native-paper";
import Toast from "react-native-toast-message";
import { acceptBooking, denyBooking } from "@/lib/api/booking-api";

const BookingCard = ({ booking, fetchData }: { booking: Booking; fetchData: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [denyReason, setDenyReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    const result = await acceptBooking(booking.id);
    if (!result.error) {
      Toast.show({
        text1: "Booking Accepted",
        text2: `Booking ${booking.code} has been accepted.`,
        position: "top",
      });
      fetchData(); 
    } else {
      Toast.show({
        text1: "Error",
        text2: result.error,
        position: "top",
      });
    }
    setIsLoading(false);
  };

  const handleDeny = async () => {
    setIsLoading(true);
    const result = await denyBooking(booking.id, denyReason);
    if (!result.error) {
      Toast.show({
        text1: "Booking Denied",
        text2: `Booking ${booking.code} has been denied.`,
        position: "top",
      });
      setIsModalVisible(false);
      setDenyReason(""); 
      fetchData(); 
    } else {
      Toast.show({
        text1: "Error",
        text2: result.error,
        position: "top",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="p-3 mb-2">
      
      <Text className="font-semibold text-xl">{booking.code}</Text>
      <Text>
        <Text className="font-bold">Booked by: </Text>
        {booking.studentFullName}
      </Text>
      <Text>
        <Text className="font-bold">Email: </Text>
        {booking.studentEmail}
      </Text>
      <Text>
        <Text className="font-bold">Booked date: </Text>
        {formatDate(toLocalDate(booking.bookingDate))}
      </Text>
      <Text>
        <Text className="font-bold">Booked at: </Text>
        {formatDate(toLocalDate(booking.createdAt), true)}
      </Text>
      <Text>
        <Text className="font-bold">Updated at: </Text>
        {formatDate(toLocalDate(booking.updatedAt), true)}
      </Text>
      <View className="flex-row gap-2 flex-wrap">
        <Text>
          <Text className="font-bold">Booked slots: </Text>
        </Text>
        {booking.roomSlots.map((slot) => (
          <Text className="px-2 py-1 bg-orange-500 text-white rounded" key={`slot-${slot.id}`}>
            {formatDateToTimeString(slot.startTime)} - {formatDateToTimeString(slot.endTime)}
          </Text>
        ))}
      </View>
      <View className="flex-row items-center mt-2">
        <Text className="font-bold ">Status: </Text>
        <View className="bg-yellow-300 px-3 py-1 rounded-lg ml-2">
          <Text className="text-black font-semibold ">{booking.status}</Text>
        </View>
      </View>

      {booking.status === "Pending" && (
        <View className="flex-row justify-end gap-2 mt-3">
          <Button mode="contained" className="bg-red-500" onPress={() => setIsModalVisible(true)}>
            Deny
          </Button>
          <Button mode="contained" className="bg-green-600" onPress={handleAccept} loading={isLoading}>
            Accept
          </Button>
        </View>
      )}

    
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-bold mb-3">
              Enter Deny Reason for Booking: {booking.code}
            </Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Reason for denial"
              value={denyReason}
              onChangeText={setDenyReason}
              multiline
            />
            <View className="flex-row justify-end gap-2">
              <Button mode="text" onPress={() => setIsModalVisible(false)}>
                Cancel
              </Button>
              <Button mode="contained" className="bg-red-500" onPress={handleDeny} loading={isLoading}>
                Submit
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Card>
  );
};

export default BookingCard;
