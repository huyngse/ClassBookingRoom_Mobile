// import { View, Text, Button, TextInput } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useRoute } from '@react-navigation/native';
// import { Room } from '@/types/room';
// import Toast from 'react-native-toast-message';
// import { getRoomById, updateRoom } from '@/lib/api/room-api';

// const UpdateRoom = () => {
//   const route = useRoute();
//   const { roomId } = route.params as { roomId: number };
//   const [room, setRoom] = useState<Room | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRoomDetails = async () => {
//       const response = await getRoomById(roomId);
//       if (response.success) {
//         setRoom(response.data);
//       }
//       setLoading(false);
//     };

//     fetchRoomDetails();
//   }, [roomId]);

//   const handleUpdateRoom = async () => {
//     if (room) {
//       const response = await updateRoom(roomId, room);
//       if (response.success) {
//         Toast.show({
//           type: 'success',
//           text1: 'Room Updated',
//           text2: 'Room details have been updated successfully.',
//         });
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Update Failed',
//           text2: 'Failed to update room details.',
//         });
//       }
//     }
//   };

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View className="p-4 bg-white flex-1">
//       <Text className="text-lg font-bold">Edit Room {roomId}</Text>
//       {room && (
//         <>
//           <TextInput
//             value={room.roomName}
//             onChangeText={(text) => setRoom({ ...room, roomName: text })}
//             placeholder="Room Name"
//             className="border p-2 my-2"
//           />
//           <TextInput
//             value={String(room.capacity)}
//             onChangeText={(text) => setRoom({ ...room, capacity: parseInt(text) })}
//             placeholder="Capacity"
//             keyboardType="numeric"
//             className="border p-2 my-2"
//           />
//           <Button title="Update Room" onPress={handleUpdateRoom} />
//         </>
//       )}
//     </View>
//   );
// };

// export default UpdateRoom;
