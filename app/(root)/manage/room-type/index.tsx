import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { RoomTypes } from '@/types/room-type';
import { getAllRoomType, updateRoomType, deleteRoomType } from '@/lib/api/room-type-api'; // Gọi các API cần thiết

const RoomType = () => {
  const [roomTypes, setRoomTypes] = useState<RoomTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      setLoading(true);
      const { data, error } = await getAllRoomType(); // Gọi API thật
      if (!error) {
        setRoomTypes(data); // Cập nhật dữ liệu từ API
      } else {
        setError(error); // Xử lý lỗi nếu có
      }
      setLoading(false);
    };

    fetchRoomTypes();
  }, []);

  const renderCohorts = (cohorts) => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {cohorts.map((cohort) => (
          <View
            key={cohort.id}
            style={{
              backgroundColor: '#e0e0e0',
              padding: 5,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Text>{cohort.cohortCode}</Text>
          </View>
        ))}
      </View>
    );
  };

  const handleEdit = async (roomType) => {
    const newName = prompt('Enter new name:', roomType.name);
    if (newName) {
      const { error } = await updateRoomType(roomType.id, { name: newName });
      if (!error) {
        setRoomTypes((prev) =>
          prev.map((rt) =>
            rt.id === roomType.id ? { ...rt, name: newName } : rt
          )
        );
        Alert.alert('Success', 'Room Type updated successfully');
      } else {
        Alert.alert('Error', error);
      }
    }
  };

  const handleDelete = async (id) => {
    const { error } = await deleteRoomType(id);
    if (!error) {
      setRoomTypes((prev) => prev.filter((roomType) => roomType.id !== id));
      Alert.alert('Success', 'Room Type deleted successfully');
    } else {
      Alert.alert('Error', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Room Types</Text>

      {/* Hiển thị thông tin các loại phòng */}
      {roomTypes.map((roomType) => (
        <View
          key={roomType.id}
          style={{
            padding: 15,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{roomType.name}</Text>
          <Text>Allowed Cohorts:</Text>
          {renderCohorts(roomType.allowedCohorts)}

          {/* Hai nút Edit và Delete nằm hai bên */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Button
              title="Edit"
              onPress={() => handleEdit(roomType)}
              color="#007bff"
            />
            <Button
              title="Delete"
              onPress={() => handleDelete(roomType.id)}
              color="#dc3545"
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default RoomType;
