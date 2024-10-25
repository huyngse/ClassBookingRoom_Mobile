import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { styled } from 'nativewind';


const StyledView = styled(View);
const StyledText = styled(Text);

const dummyReports = [
  {
    content: "Issue with the projector in Room 101.",
    sender: "John Doe",
    response: "Technician has been assigned to resolve the issue.",
    room: "Room 101",
    createdAt: "2024-10-22 09:00",
    updatedAt: "2024-10-22 10:30",
    status: "pending",
  },
  {
    content: "WiFi not working in Room 202.",
    sender: "Jane Smith",
    response: "WiFi has been fixed by the IT department.",
    room: "Room 202",
    createdAt: "2024-10-21 08:15",
    updatedAt: "2024-10-21 12:00",
    status: "approved",
  },
  {
    content: "Air conditioner leaking in Room 303.",
    sender: "Mark Johnson",
    response: "",
    room: "Room 303",
    createdAt: "2024-10-22 11:00",
    updatedAt: "2024-10-22 11:45",
    status: "rejected",
  },
];


const getStatusStyle = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500 text-black';
    case 'approved':
      return 'bg-green-500 text-white';
    case 'rejected':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const Report = ({ report }) => {
  const handleApprove = () => {
    console.log('Report Approved');
  };

  const handleReject = () => {
    console.log('Report Rejected');
  };

  const handleDelete = () => {
    console.log('Report Deleted');
  };

  return (
    <StyledView className="bg-white p-5 rounded-lg mb-5 shadow">
      <StyledText className="text-lg font-bold">Content:</StyledText>
      <StyledText className="mb-2">{report.content}</StyledText>

      <StyledText className="text-lg font-bold">Sender:</StyledText>
      <StyledText className="mb-2">{report.sender}</StyledText>

      <StyledText className="text-lg font-bold">Response:</StyledText>
      <StyledText className="mb-2">{report.response}</StyledText>

      <StyledText className="text-lg font-bold">Room:</StyledText>
      <StyledText className="mb-2">{report.room}</StyledText>

      <StyledText className="text-lg font-bold">Created At:</StyledText>
      <StyledText className="mb-2">{report.createdAt}</StyledText>

      <StyledText className="text-lg font-bold">Updated At:</StyledText>
      <StyledText className="mb-2">{report.updatedAt}</StyledText>

      <StyledText className="text-lg font-bold">Status:</StyledText>
      <StyledText className={`px-2 py-1 rounded-full text-center ${getStatusStyle(report.status)} mb-5`}>
        {report.status.toUpperCase()}
      </StyledText>

      
      {report.status === 'pending' ? (
        <StyledView className="flex-row justify-between mt-5">
          <Button color="#4CAF50" title="Approve" onPress={handleApprove} />
          <Button color="#FF9800" title="Reject" onPress={handleReject} />
        </StyledView>
      ) : (
        <Button color="#F44336" title="Delete" onPress={handleDelete} />
      )}
    </StyledView>
  );
};


const App = () => {
  return (
    <ScrollView className="flex-1 p-5">
      <StyledText className="text-4xl font-bold text-center mb-5 pt-6">Manage Reports</StyledText>
      {dummyReports.map((report, index) => (
        <Report key={index} report={report} />
      ))}
    </ScrollView>
  );
};

export default App;
