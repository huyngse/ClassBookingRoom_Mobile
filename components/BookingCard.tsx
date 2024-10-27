import { Booking } from "@/types/booking";
import { formatDate, toLocalDate } from "@/utils/date";
import { formatDateToTimeString } from "@/utils/time";
import { Text, View } from "react-native";
import { Button, Card } from "react-native-paper";

const BookingCard = ({ booking }: { booking: Booking }) => {
    return (
      <Card className="p-3">
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
        <View className="flex-row gap-2">
          <Text>
            <Text className="font-bold">Booked slots: </Text>
          </Text>
          {booking.roomSlots.map((slot) => {
            return (
              <Text
                className="px-2 py-1 bg-orange-500 text-white rounded"
                key={`slot-${slot.id}`}
              >
                {formatDateToTimeString(slot.startTime)} -{" "}
                {formatDateToTimeString(slot.endTime)}
              </Text>
            );
          })}
        </View>
        <Text>
          <Text className="font-bold">Status: </Text>
          {booking.status}
        </Text>
        {booking.status == "Pending" && (
          <View className="flex-row justify-end gap-2">
            <Button>Deny</Button>
            <Button mode="contained">Accept</Button>
          </View>
        )}
      </Card>
    );
  };
  export default BookingCard;