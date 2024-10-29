import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { CheckIcon, XIcon } from 'lucide-react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { getAllUsers } from '@/lib/api/user-api'; // Import API thật
import { User } from '@/types/user';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);

const Users = () => {
  const [studentsData, setStudentsData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Khai báo navigation
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await getAllUsers(); // Gọi API thật
      if (!error) {
        setStudentsData(data); // Cập nhật dữ liệu từ API
      } else {
        setError(error); // Xử lý lỗi nếu có
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const toggleStatus = (id) => {
    setStudentsData((prevState) =>
      prevState.map((student) =>
        student.id === id
          ? { ...student, status: student.status === 'Active' ? 'Inactive' : 'Active' } 
          : student // Trả về student nếu id không khớp
      )
    );
  };
  ;
  

  const toggleVerify = (id) => {
    setStudentsData((prevState) =>
      prevState.map((student) =>
        student.id === id ? { ...student, isVerified: !student.isVerify } : student
      )
    );
  };

  const handleEdit = (student: any) => {
    // Điều hướng đến trang EditStudent và truyền dữ liệu sinh viên
    navigation.navigate('edit-student', { student });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView className="p-4">
      <StyledView className="items-center mb-4">
        <StyledText className="text-2xl pt-8 font-bold">
          Manage Accounts
        </StyledText>
      </StyledView>

      <StyledButton mode="contained" className="bg-pink-500 mb-4">
        Create Account
      </StyledButton>

      {studentsData.map((student) => (
        <StyledView
          key={student.id}
          className="mb-8 p-4 border border-gray-300 rounded-lg"
        >
          <StyledView className="items-center mb-4">
            <Image source={{ uri: student.profileImageURL }} className="w-24 h-24 rounded-full" />
          </StyledView>

          <StyledView className="mb-4">
            <StyledText className="text-lg font-bold">
              Full Name: {student.fullName}
            </StyledText>
            <StyledText>Email: {student.email}</StyledText>
            <StyledText>Department: {student.departmentId}</StyledText>
            <StyledText>Cohort: {student.cohortId}</StyledText>
            <StyledText>Created At: {student.createdAt}</StyledText>
            <StyledText>Updated At: {student.updatedAt}</StyledText>
          </StyledView>

          <StyledView className="flex-row items-center justify-between mb-4">
            <StyledText>Status:</StyledText>
            <Switch
              value={student.status}
              onValueChange={() => toggleStatus(student.id)}
            />
          </StyledView>

          <StyledView className="flex-row items-center justify-between mb-4">
            <StyledText>Verify:</StyledText>
            {student.isVerify ? (
              <CheckIcon className="text-green-500" />
            ) : (
              <XIcon className="text-red-500" />
            )}
          </StyledView>

          <StyledView className="flex-row justify-between">
            {!student.isVerify ? (
              <>
                <StyledButton
                  mode="contained"
                  className="bg-green-500"
                  onPress={() => toggleVerify(student.id)}
                >
                  Approve
                </StyledButton>
                <StyledButton
                  mode="contained"
                  className="bg-orange-500"
                  onPress={() => Alert.alert(`Rejected student: ${student.fullName}`)}
                >
                  Reject
                </StyledButton>
              </>
            ) : (
              <StyledButton
                mode="contained"
                className="bg-red-500"
                onPress={() => Alert.alert(`Deleted student: ${student.fullName}`)}
              >
                Delete
              </StyledButton>
            )}

            {/* Edit Button */}
            <StyledButton
              mode="contained"
              className="bg-blue-500 ml-2"
              onPress={() => handleEdit(student)} // Điều hướng đến trang Edit
              onPress={() => handleEdit(student)} // Điều hướng đến trang Edit
            >
              Edit
            </StyledButton>
          </StyledView>
        </StyledView>
      ))}
    </ScrollView>
  );
};

export default Users;
