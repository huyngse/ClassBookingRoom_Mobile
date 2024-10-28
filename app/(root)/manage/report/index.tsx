import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { styled } from "nativewind";
import Toast from "react-native-toast-message";
import {
  getAllReports,
  deleteReport,
  approveReport,
  denyReport,
} from "@/lib/api/report-api";
import { Report as ReportType } from "@/types/report"; // Đổi tên import Report để tránh xung đột với component

const StyledView = styled(View);
const StyledText = styled(Text);

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-500 text-black";
    case "Accepted":
      return "bg-green-500 text-white";
    case "Denied":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const ManageReports = ({ report, onDelete, onApprove, onDeny }: any) => {
  const [denyReason, setDenyReason] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleApprove = async () => {
    try {
      await approveReport(report.id);
      Toast.show({
        text1: "Success",
        text2: "Report approved successfully",
        position: "top",
      });
      onApprove(report.id);
    } catch (error) {
      Toast.show({
        text1: "Error",
        text2: "Failed to approve report",
        position: "top",
      });
    }
  };

  const handleReject = () => {
    setModalVisible(true); // Hiển thị modal khi nhấn Reject
  };

  const handleDenySubmit = async () => {
    if (!denyReason.trim()) {
      Alert.alert("Error", "Reason is required to deny the report.");
      return;
    }

    try {
      await denyReport(report.id, denyReason);
      Toast.show({
        text1: "Success",
        text2: "Report denied successfully",
        position: "top",
      });
      setModalVisible(false); // Ẩn modal sau khi nhập lý do
      setDenyReason(""); // Xóa input sau khi thành công
      onDeny(report.id);
    } catch (error) {
      Toast.show({
        text1: "Error",
        text2: "Failed to deny report",
        position: "top",
      });
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this report?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReport(report.id);
              Toast.show({
                text1: "Success",
                text2: "Report deleted successfully",
                position: "top",
              });
              onDelete(report.id);
            } catch (error) {
              Toast.show({
                text1: "Error",
                text2: "Failed to delete report",
                position: "top",
              });
            }
          },
        },
      ]
    );
  };

  return (
    <>
      <StyledView className="bg-white p-5 rounded-lg mb-5 shadow">
        <StyledText className="text-lg font-bold">Title:</StyledText>
        <StyledText className="mb-2">{report.title}</StyledText>

        <StyledText className="text-lg font-bold">Sender:</StyledText>
        <StyledText className="mb-2">{report.studentFullName}</StyledText>

        <StyledText className="text-lg font-bold">Response:</StyledText>
        <StyledText className="mb-2">
          {report.response || "No response yet"}
        </StyledText>

        <StyledText className="text-lg font-bold">Room:</StyledText>
        <StyledText className="mb-2">{report.roomName}</StyledText>

        <StyledText className="text-lg font-bold">Created At:</StyledText>
        <StyledText className="mb-2">
          {new Date(report.createdAt).toLocaleDateString()}
        </StyledText>

        <StyledText className="text-lg font-bold">Updated At:</StyledText>
        <StyledText className="mb-2">
          {new Date(report.updatedAt).toLocaleDateString()}
        </StyledText>

        <StyledText className="text-lg font-bold">Status:</StyledText>
        <StyledText
          className={`px-2 py-1 rounded-full text-center ${getStatusStyle(
            report.status
          )} mb-5`}
        >
          {report.status.toUpperCase()}
        </StyledText>

        {report.status === "Pending" ? (
          <StyledView className="flex-row justify-between mt-5">
            <Button color="#4CAF50" title="Approve" onPress={handleApprove} />
            <Button color="#FF9800" title="Reject" onPress={handleReject} />
          </StyledView>
        ) : (
          <Button color="#F44336" title="Delete" onPress={handleDelete} />
        )}
      </StyledView>

      {/* Modal cho lý do từ chối */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Enter Denial Reason
            </Text>
            <TextInput
              style={{
                borderColor: "#ccc",
                borderWidth: 1,
                padding: 10,
                marginBottom: 20,
                borderRadius: 5,
                width: "100%",
              }}
              placeholder="Reason for denial"
              value={denyReason}
              onChangeText={setDenyReason}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Submit" onPress={handleDenySubmit} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const App = () => {
  const [reports, setReports] = useState<ReportType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const roomResult = await getAllReports();
      if (roomResult.error) {
        Toast.show({
          text1: "Error",
          text2: roomResult.error,
          position: "top",
        });
      } else {
        setReports(roomResult.data);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    setReports((prevReports) =>
      prevReports.filter((report) => report.id !== id)
    );
  };

  const handleApprove = (id: number) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id ? { ...report, status: "Accepted" } : report
      )
    );
  };

  const handleDeny = (id: number) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id ? { ...report, status: "Denied" } : report
      )
    );
  };

  return (
    <ScrollView className="flex-1 p-5">
      <StyledText className="text-4xl font-bold text-center mb-5 pt-6">
        Manage Reports
      </StyledText>
      {reports.map((report, index) => (
        <ManageReports
          key={index}
          report={report}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onDeny={handleDeny}
        />
      ))}
    </ScrollView>
  );
};

export default App;
