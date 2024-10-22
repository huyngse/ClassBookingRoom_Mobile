import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);

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
    // Thực hiện logic chọn avatar (giả lập thay đổi URL avatar ở đây)
    setAvatar('https://i.pravatar.cc/100?img=5'); // Giả lập việc thay đổi avatar
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
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
          </TouchableOpacity>
          <StyledText className="text-gray-600 mt-2">Tap to change avatar</StyledText>
        </StyledView>

        {/* Full Name */}
        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Full Name</StyledText>
          <StyledTextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
            className="border border-gray-300 rounded-lg p-2"
          />
        </StyledView>

        {/* Email */}
        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Email</StyledText>
          <StyledTextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter email"
            className="border border-gray-300 rounded-lg p-2"
          />
        </StyledView>

        {/* Department */}
        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Department</StyledText>
          <StyledTextInput
            value={department}
            onChangeText={setDepartment}
            placeholder="Enter department"
            className="border border-gray-300 rounded-lg p-2"
          />
        </StyledView>

        {/* Cohort */}
        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Cohort</StyledText>
          <StyledTextInput
            value={cohort}
            onChangeText={setCohort}
            placeholder="Enter cohort"
            className="border border-gray-300 rounded-lg p-2"
          />
        </StyledView>

        {/* Save Button */}
        <StyledButton
          mode="contained"
          onPress={handleSave}
          className="bg-green-500 py-2 rounded-lg"
        >
          Save Changes
        </StyledButton>

        {/* Back Button */}
        <StyledButton
          mode="text"
          onPress={() => navigation.goBack()}
          className="mt-4"
          textColor="red"
        >
          Back to Students
        </StyledButton>
      </StyledView>
    </StyledView>
  );
};

export default EditStudent;
