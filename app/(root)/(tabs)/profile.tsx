import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';

const Profile = () => {
  const handleLogout = () => {
    
    Alert.alert('Log out', 'You were logged out successfully!');
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
  
      <View className="bg-orange-400 h-64 justify-center items-center pt-9">
        <Image
          style={{ height: 128, width: 128, borderRadius: 64, borderWidth: 4, borderColor: 'white' }}
          source={{ uri: 'https://i.pravatar.cc/300' }} 
        />
        <Text className="text-white mt-4 text-2xl font-bold">John Doe</Text>
        <Text className="text-white text-base">john.doe@example.com</Text>
      </View>


      <View className="p-6">
        <Text className="text-xl font-semibold mb-4">Thông tin tài khoản</Text>

    
        <View className="flex-row justify-between py-2 border-b border-gray-300">
          <Text className="text-gray-700">Full Name:</Text>
          <Text className="text-gray-500">John Doe</Text>
        </View>

        <View className="flex-row justify-between py-2 border-b border-gray-300">
          <Text className="text-gray-700">Email:</Text>
          <Text className="text-gray-500">john.doe@example.com</Text>
        </View>

        <View className="flex-row justify-between py-2 border-b border-gray-300">
          <Text className="text-gray-700">Role:</Text>
          <Text className="text-gray-500">Manager</Text>
        </View>

        <View className="flex-row justify-between py-2 border-b border-gray-300">
          <Text className="text-gray-700">Create Date:</Text>
          <Text className="text-gray-500">01/01/2023</Text>
        </View>

        <View className="flex-row justify-between py-2 border-b border-gray-300">
          <Text className="text-gray-700">Update At:</Text>
          <Text className="text-gray-500">10/10/2023</Text>
        </View>

        
        <TouchableOpacity onPress={handleLogout} className="bg-red-500 mt-6 py-3 rounded-full">
          <Text className="text-center text-white text-lg font-semibold">
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
