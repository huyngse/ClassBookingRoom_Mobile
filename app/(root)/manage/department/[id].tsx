import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styled } from "nativewind";
import Toast from "react-native-toast-message"; // Import Toast
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDepartmentById } from "@/lib/api/department-api";
import {
  createActivity,
  updateActivity,
  deleteActivity,
} from "@/lib/api/activity-api"; // Import API cho activities
import { Department } from "@/types/department"; // Import kiểu Department
import { formatDate } from "@/utils/date";

const DepartmentDetail = () => {
  const { id } = useLocalSearchParams(); // Lấy ID của department từ URL
  const [department, setDepartment] = useState<Department | null>(null); // Sử dụng kiểu Department cho state
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái modal
  const [activityForm, setActivityForm] = useState<{
    code: string;
    name: string;
    activityId: number | undefined;
  }>({ code: "", name: "", activityId: undefined }); // Form dữ liệu cho activity
  const [isEdit, setIsEdit] = useState(false); // Trạng thái kiểm tra Edit
  const router = useRouter(); // Khởi tạo useRouter để điều hướng

  // Gọi API lấy thông tin department theo ID
  const fetchDepartmentDetail = async () => {
    try {
      const response = await getDepartmentById(Number(id)); // Đảm bảo ID là kiểu số
      if (!response.error && response.data) {
        setDepartment(response.data); // Lưu dữ liệu department vào state
      } else {
        setDepartment(null);
      }
    } catch (error) {
      console.error("Failed to fetch department detail:", error);
      setDepartment(null);
    } finally {
      setLoading(false); // Dừng trạng thái loading sau khi gọi API xong
    }
  };

  useEffect(() => {
    fetchDepartmentDetail(); // Gọi hàm fetch khi component được mount
  }, [id]);

  // Hàm để tạo hoặc cập nhật activity
  const handleCreateOrUpdateActivity = async () => {
    console.log("Form data before API call: ", activityForm); // Kiểm tra dữ liệu trước khi gọi API

    try {
      if (isEdit && activityForm.activityId) {
        // Cập nhật activity
        const response = await updateActivity(activityForm.activityId, {
          code: activityForm.code,
          name: activityForm.name,
        });
        console.log("API response for update: ", response); // Kiểm tra phản hồi API sau khi gọi
        Toast.show({
          type: "success",
          text1: "Activity Updated",
          text2: "Activity has been updated successfully.",
        });
      } else {
        // Tạo mới activity
        const response = await createActivity({
          code: activityForm.code,
          name: activityForm.name,
          departmentId: Number(id),
        });
        console.log("API response for create: ", response); // Kiểm tra phản hồi API sau khi gọi
        Toast.show({
          type: "success",
          text1: "Activity Created",
          text2: "New activity has been created successfully.",
        });
      }
      setModalVisible(false); // Ẩn modal sau khi hoàn tất
      fetchDepartmentDetail(); // Cập nhật danh sách activity sau khi tạo hoặc cập nhật
    } catch (error) {
      console.error("Failed to create/update activity:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to perform the action.",
      });
    }
  };

  // Hàm để xóa activity
  const handleDeleteActivity = async (activityId: number) => {
    try {
      await deleteActivity(activityId);
      fetchDepartmentDetail(); // Cập nhật lại danh sách
      Toast.show({
        type: "success",
        text1: "Activity Deleted",
        text2: "Activity has been deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete activity:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete the activity.",
      });
    }
  };

  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledButton = styled(TouchableOpacity);

  if (loading) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <StyledText className="text-base text-gray-500">
          Loading department details...
        </StyledText>
      </StyledView>
    );
  }

  if (!department) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText className="text-lg text-red-500">
          Department not found.
        </StyledText>
      </StyledView>
    );
  }

  return (
    <ScrollView className="p-4 bg-gray-100">
      <StyledView className="flex-1">
        {/* Nút tạo activity ở trên đầu */}
        <StyledButton
          className="bg-green-500 p-3 rounded mb-4"
          onPress={() => {
            setActivityForm({ code: "", name: "", activityId: undefined });
            setIsEdit(false);
            setModalVisible(true);
          }}
        >
          <StyledText className="text-white text-center">
            Create New Activity
          </StyledText>
        </StyledButton>

        {/* Thông tin department */}
        <StyledView className="mb-4 p-4 bg-white shadow-lg rounded-lg">
          <StyledText className="text-xl font-bold text-blue-700">
            {department.name}
          </StyledText>
          <StyledText className="text-sm text-gray-600">
            Created At: {formatDate(new Date(department.createdAt))}
          </StyledText>
          <StyledText className="text-sm text-gray-600">
            Updated At: {formatDate(new Date(department.updatedAt))}
          </StyledText>
        </StyledView>

        {/* Danh sách activities */}
        <StyledView className="mb-4 p-4 bg-white shadow-lg rounded-lg">
          <StyledText className="text-lg font-bold text-blue-700 mb-2">
            Activities
          </StyledText>
          {department.activites && department.activites.length > 0 ? (
            department.activites.map((activity) => (
              <StyledView
                key={activity.id}
                className="mb-2 p-3 bg-gray-100 rounded-lg flex-row justify-between items-center"
              >
                <View className="flex">
                  <StyledText className="text-lg font-bold text-black">
                    {activity.name}
                  </StyledText>
                  <StyledText className="text-sm text-gray-600">
                    Activity Code: {activity.code}
                  </StyledText>
                </View>
                <StyledView className="flex-row space-x-2">
                  {/* Nút Edit bên trái */}
                  <StyledButton
                    className="bg-blue-500 p-2 rounded"
                    onPress={() => {
                      console.log("Editing activity: ", activity); // Log thông tin của activity được chọn
                      setActivityForm({
                        code: activity.code,
                        name: activity.name,
                        activityId: activity.id,
                      });
                      setIsEdit(true);
                      setModalVisible(true);
                    }}
                  >
                    <StyledText className="text-white">Edit</StyledText>
                  </StyledButton>
                  {/* Nút Delete bên phải */}
                  <StyledButton
                    className="bg-red-500 p-2 rounded"
                    onPress={() => handleDeleteActivity(activity.id)}
                  >
                    <StyledText className="text-white">Delete</StyledText>
                  </StyledButton>
                </StyledView>
              </StyledView>
            ))
          ) : (
            <StyledText>
              No activities available for this department.
            </StyledText>
          )}
        </StyledView>

        {/* Modal tạo/sửa activity */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <StyledView className="flex-1 justify-center items-center bg-orange-500 bg-opacity-95">
            <StyledView className="p-4 bg-white shadow-lg rounded-lg w-3/4">
              <StyledText className="text-lg font-bold text-blue-700">
                {isEdit ? "Edit Activity" : "Create Activity"}
              </StyledText>
              <TextInput
                placeholder="Activity Code"
                value={activityForm.code}
                onChangeText={(text) => {
                  console.log("Updating code: ", text); // Log dữ liệu code mỗi khi người dùng nhập
                  setActivityForm({ ...activityForm, code: text });
                }}
                className="border p-2 mb-2 rounded"
              />
              <TextInput
                placeholder="Activity Name"
                value={activityForm.name}
                onChangeText={(text) => {
                  console.log("Updating name: ", text); // Log dữ liệu name mỗi khi người dùng nhập
                  setActivityForm({ ...activityForm, name: text });
                }}
                className="border p-2 mb-2 rounded"
              />
              <StyledButton
                className="bg-blue-500 p-2 rounded"
                onPress={handleCreateOrUpdateActivity}
              >
                <StyledText className="text-white">
                  {isEdit ? "Update Activity" : "Create Activity"}
                </StyledText>
              </StyledButton>
              <StyledButton
                className="bg-gray-500 p-2 mt-2 rounded"
                onPress={() => setModalVisible(false)}
              >
                <StyledText className="text-white text-center">
                  Close
                </StyledText>
              </StyledButton>
            </StyledView>
          </StyledView>
        </Modal>

        {/* Toast message */}
        <Toast />
      </StyledView>
    </ScrollView>
  );
};

export default DepartmentDetail;
