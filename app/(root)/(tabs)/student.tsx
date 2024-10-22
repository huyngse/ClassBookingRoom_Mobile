import React, { useState } from 'react';
import { View, Text, Switch, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { CheckIcon, XIcon } from 'lucide-react-native';
import { styled } from 'nativewind';


const students = [
  {
    id: 1,
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    department: 'Công nghệ thông tin',
    cohort: 'K15',
    avatar: 'https://i.pravatar.cc/100?img=1',
    createdAt: '2022-01-01',
    updatedAt: '2023-01-01',
    isVerified: false,
    status: true,
  },
  {
    id: 2,
    fullName: 'Trần Thị B',
    email: 'tranthib@example.com',
    department: 'Quản trị kinh doanh',
    cohort: 'K16',
    avatar: 'https://i.pravatar.cc/100?img=2',
    createdAt: '2021-09-01',
    updatedAt: '2022-12-12',
    isVerified: true,
    status: false,
  },
  {
    id: 3,
    fullName: 'Phạm Văn C',
    email: 'phamvanc@example.com',
    department: 'Kỹ thuật phần mềm',
    cohort: 'K17',
    avatar: 'https://i.pravatar.cc/100?img=3',
    createdAt: '2023-02-15',
    updatedAt: '2023-03-20',
    isVerified: true,
    status: true,
  },
];


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);

const Student = () => {
  const [studentsData, setStudentsData] = useState(students);

  const toggleStatus = (id) => {
    setStudentsData((prevState) =>
      prevState.map((student) =>
        student.id === id ? { ...student, status: !student.status } : student
      )
    );
  };

  const toggleVerify = (id) => {
    setStudentsData((prevState) =>
      prevState.map((student) =>
        student.id === id ? { ...student, isVerified: !student.isVerified } : student
      )
    );
  };

  return (
    <ScrollView className="p-4">
      <StyledView className="items-center mb-4">
        <StyledText className="text-2xl pt-8 font-bold">Manage Accounts</StyledText>
      </StyledView>

      <StyledButton mode="contained" className="bg-pink-500 mb-4">
        Create Account
      </StyledButton>

      {studentsData.map((student) => (
        <StyledView key={student.id} className="mb-8 p-4 border border-gray-300 rounded-lg">
          <StyledView className="items-center mb-4">
            <Image
              source={{ uri: student.avatar }}
              className="w-24 h-24 rounded-full"
            />
          </StyledView>

          <StyledView className="mb-4">
            <StyledText className="text-lg font-bold">Full Name: {student.fullName}</StyledText>
            <StyledText>Email: {student.email}</StyledText>
            <StyledText>Department: {student.department}</StyledText>
            <StyledText>Cohort: {student.cohort}</StyledText>
            <StyledText>Created At: {student.createdAt}</StyledText>
            <StyledText>Updated At: {student.updatedAt}</StyledText>
          </StyledView>

          <StyledView className="flex-row items-center justify-between mb-4">
            <StyledText>Status:</StyledText>
            <Switch value={student.status} onValueChange={() => toggleStatus(student.id)} />
          </StyledView>

          <StyledView className="flex-row items-center justify-between mb-4">
            <StyledText>Verify:</StyledText>
            {student.isVerified ? (
              <CheckIcon className="text-green-500" />
            ) : (
              <XIcon className="text-red-500" />
            )}
          </StyledView>

          <StyledView className="flex-row justify-between">
            {!student.isVerified ? (
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
                  onPress={() => alert(`Rejected student: ${student.fullName}`)}
                >
                  Reject
                </StyledButton>
              </>
            ) : (
              <StyledButton
                mode="contained"
                className="bg-red-500"
                onPress={() => alert(`Deleted student: ${student.fullName}`)}
              >
                Delete
              </StyledButton>
            )}

            {/* Edit Button */}
            <StyledButton
              mode="contained"
              className="bg-blue-500 ml-2"
              onPress={() => alert(`Edit student: ${student.fullName}`)}
            >
              Edit
            </StyledButton>
          </StyledView>
        </StyledView>
      ))}
    </ScrollView>
  );
};

export default Student;
