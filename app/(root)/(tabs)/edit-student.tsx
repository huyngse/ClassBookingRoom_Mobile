import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const EditStudent = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { student } = route.params;

  const [fullName, setFullName] = useState(student.fullName);
  const [email, setEmail] = useState(student.email);
  const [department, setDepartment] = useState(student.department);
  const [cohort, setCohort] = useState(student.cohort);
  const [avatar, setAvatar] = useState(student.avatar);

  const handleSave = () => {
    alert('Student details updated successfully!');
    navigation.goBack();
  };

  const handleChooseAvatar = () => {
    setAvatar('https://i.pravatar.cc/100?img=5');
  };

  return (
    <StyledView className="flex-1 bg-gray-100">
      {/* Header */}
      <StyledView className="bg-blue-500 py-4 px-4">
        <StyledText className="text-white text-lg font-bold">Edit Account</StyledText>
      </StyledView>

      {/* Form */}
      <StyledView className="p-4">
        <StyledText className="text-2xl font-bold text-gray-800 mb-4">Edit Student Information</StyledText>

        {/* Avatar */}
        <StyledView className="items-center mb-6">
          <TouchableOpacity onPress={handleChooseAvatar}>
            <Image
              source={{ uri: avatar }}
              style={{ width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: '#ccc' }} // Thay thế className bằng style
            />
          </TouchableOpacity>
          <StyledText className="text-gray-600 mt-2">Tap to change avatar</StyledText>
        </StyledView>

        {/* Full Name */}
        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Full Name</StyledText>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 }} // Thay thế className bằng style
          />
        </StyledView>

        {/* Email */}
        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Email</StyledText>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter email"
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 }} // Thay thế className bằng style
          />
        </StyledView>

        {/* Department */}
        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Department</StyledText>
          <TextInput
            value={department}
            onChangeText={setDepartment}
            placeholder="Enter department"
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 }} // Thay thế className bằng style
          />
        </StyledView>

        {/* Cohort */}
        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Cohort</StyledText>
          <TextInput
            value={cohort}
            onChangeText={setCohort}
            placeholder="Enter cohort"
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 }} // Thay thế className bằng style
          />
        </StyledView>

        {/* Save Button */}
        <Button
          mode="contained"
          onPress={handleSave}
          contentStyle={{ paddingVertical: 8 }}
          style={{ backgroundColor: '#38a169', borderRadius: 8 }}
        >
          Save Changes
        </Button>

        {/* Back Button */}
        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          contentStyle={{ paddingVertical: 8 }}
          labelStyle={{ color: 'red' }}
          style={{ marginTop: 16 }}
        >
          Back to Students
        </Button>
      </StyledView>
    </StyledView>
  );
};

export default EditStudent;
