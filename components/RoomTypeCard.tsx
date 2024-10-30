import { View, Text, Pressable } from "react-native";
import React from "react";
import { RoomTypes } from "@/types/room-type";
import { deleteRoomType, updateRoomType } from "@/lib/api/room-type-api";
import { EllipsisVertical } from "lucide-react-native";
import { Divider, Menu } from "react-native-paper";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const RoomTypeCard = ({
  roomType,
  fetchData,
}: {
  roomType: RoomTypes;
  fetchData: () => void;
}) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const renderCohorts = (cohorts: { id: number; cohortCode: string }[]) => {
    return (
      <View className="flex-row flex-wrap py-1">
        {cohorts.map((cohort) => (
          <View
            key={cohort.id}
            className="bg-orange-500 rounded px-2 py-1 mr-1"
          >
            <Text className="text-white">{cohort.cohortCode}</Text>
          </View>
        ))}
        {cohorts.length == 0 && <Text className="text-gray-500">None</Text>}
      </View>
    );
  };

  const handleEdit = async (roomType: RoomTypes) => {
    const newName = prompt("Enter new name:", roomType.name);
  };

  const handleDelete = async () => {
    const deleteResult = await deleteRoomType(roomType.id);
    if (deleteResult.error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: deleteResult.error,
      });
    } else {
      setTimeout(() => {
        fetchData();
      }, 1000);
    }
  };

  return (
    <View
      key={roomType.id}
      style={{
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
      }}
      className="bg-white"
    >
      <View className="flex-row justify-between">
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {roomType.name}
        </Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Pressable
              android_ripple={{ color: "#ddd" }}
              className="p-1"
              onPress={openMenu}
            >
              <EllipsisVertical className="text-black" />
            </Pressable>
          }
        >
          <Menu.Item
            onPress={() => {
              router.navigate(`/(root)/manage/room-type/update/${roomType.id}`);
            }}
            title="Edit"
          />
          <Menu.Item
            onPress={() => {
              router.navigate(`/(root)/manage/room-type/${roomType.id}`);
            }}
            title="Manage cohorts"
          />
          <Divider />
          <Menu.Item onPress={handleDelete} title="Delete" />
        </Menu>
      </View>
      <Text>Allowed Cohorts:</Text>
      {renderCohorts(roomType.allowedCohorts)}
    </View>
  );
};

export default RoomTypeCard;
