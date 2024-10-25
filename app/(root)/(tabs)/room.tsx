import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Toast from 'react-native-toast-message';
import { getAllReports } from '@/lib/api/report-api'; 

const StyledView = styled(View);
const StyledText = styled(Text);

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

const ReportComponent = ({ report }) => {
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
      <StyledText className="text-lg font-bold">Title:</StyledText>
      <StyledText className="mb-2">{report.title}</StyledText>

      <StyledText className="text-lg font-bold">Description:</StyledText>
      <StyledText className="mb-2">{report.description}</StyledText>

      <StyledText className="text-lg font-bold">Room Name:</StyledText>
      <StyledText className="mb-2">{report.roomName}</StyledText>

      <StyledText className="text-lg font-bold">Student Name:</StyledText>
      <StyledText className="mb-2">{report.studentFullName}</StyledText>

      <StyledText className="text-lg font-bold">Response:</StyledText>
      <StyledText className="mb-2">{report.response || "No response yet"}</StyledText>

      <StyledText className="text-lg font-bold">Created At:</StyledText>
      <StyledText className="mb-2">{new Date(report.createdAt).toLocaleDateString()}</StyledText>

      <StyledText className="text-lg font-bold">Updated At:</StyledText>
      <StyledText className="mb-2">{new Date(report.updatedAt).toLocaleDateString()}</StyledText>

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
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const reportResult = await getAllReports(); 
      if (reportResult.error) {
        Toast.show({
          text1: "Error",
          text2: reportResult.error,
          position: "top",
        });
      } else {
        setReports(reportResult.data);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView className="flex-1 p-5">
      <StyledText className="text-4xl font-bold text-center mb-5 pt-6">Manage Reports</StyledText>
      {reports.map((report, index) => (
        <ReportComponent key={index} report={report} />
      ))}
    </ScrollView>
  );
};

export default App;
