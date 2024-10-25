import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity, Modal, TextInput } from "react-native";
import { styled } from "nativewind";
import { getAllDepartments, deleteDepartment, updateDepartment, createDepartment } from "@/lib/api/department-api"; // Import hàm createDepartment
import { Department } from "@/types/department";
import { formatDate } from "@/utils/date";
import { useRouter } from "expo-router"; // Sử dụng useRouter để điều hướng

const Departments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null); // Department được chọn để edit
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái modal
  const [isCreating, setIsCreating] = useState(false); // Kiểm tra trạng thái đang tạo mới hay chỉnh sửa

  const router = useRouter(); // Để sử dụng router điều hướng

  // Điều hướng đến trang chi tiết của department
  const handleViewDetail = (id) => {
    router.push(`/manage/department/${id}`);
  };

  // Gọi API lấy danh sách departments
  const fetchDepartments = async () => {
    try {
      const response = await getAllDepartments();
      if (response.success && response.data) {
        setDepartments(response.data);
      } else {
        setDepartments([]);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý xóa department
  const handleDelete = async (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this department?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          console.log("Delete button clicked for ID:", id);
          const response = await deleteDepartment(id);
          console.log("Delete response:", response);

          if (response.success) {
            setDepartments(departments.filter((department) => department.id !== id));
            Alert.alert("Deleted", "Department has been deleted.");
          } else {
            Alert.alert("Error", `Failed to delete department: ${response.error}`);
          }
        },
      },
    ]);
  };

  // Hàm xử lý khi nhấn Edit
  const handleEdit = (department: Department) => {
    console.log("Edit button clicked for department:", department); // Log thông tin department
    setSelectedDepartment(department); // Chọn department để edit
    setIsCreating(false); // Đang chỉnh sửa
    setModalVisible(true); // Hiển thị modal
  };

  // Hàm xử lý khi nhấn Create
  const handleCreate = () => {
    setSelectedDepartment({ id: 0, name: "", createdAt: "", updatedAt: "" }); // Tạo department mới với giá trị mặc định
    setIsCreating(true); // Đang tạo mới
    setModalVisible(true); // Hiển thị modal
  };

  // Hàm xử lý lưu thông tin đã chỉnh sửa hoặc tạo mới
  const handleSave = async () => {
    if (selectedDepartment) {
      const { name } = selectedDepartment;
      if (isCreating) {
        // Tạo mới department
        const response = await createDepartment({ name });
        if (response.success) {
          setModalVisible(false);
          fetchDepartments(); // Làm mới danh sách sau khi tạo thành công
          Alert.alert("Success", "Department has been created.");
        } else {
          Alert.alert("Error", `Failed to create department: ${response.error}`);
        }
      } else {
        // Cập nhật department
        const { id } = selectedDepartment;
        const response = await updateDepartment(id, { name });
        if (response.success) {
          setModalVisible(false);
          fetchDepartments();
          Alert.alert("Success", "Department has been updated.");
        } else {
          Alert.alert("Error", `Failed to update department: ${response.error}`);
        }
      }
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const StyledView = styled(View);
  const StyledText = styled(Text);

  if (loading) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText>Loading...</StyledText>
      </StyledView>
    );
  }

  return (
    <ScrollView className="p-4 bg-gray-100">
      <StyledView className="flex-1">
        {/* Nút Create ở trên cùng */}
        <TouchableOpacity
          onPress={handleCreate} // Chỉ gọi handleCreate
          className="bg-green-500 p-3 rounded-lg mb-4 w-24 items-center self-start"
        >
          <Text className="text-white text-sm">Create</Text>
        </TouchableOpacity>

        {departments.length > 0 ? (
          departments.map((department) => (
            <TouchableOpacity key={department.id} onPress={() => handleViewDetail(department.id)}>
              <StyledView className="mb-4 p-4 bg-white shadow-lg rounded-lg">
                <StyledText className="text-lg font-bold text-blue-700">{department.name}</StyledText>
                <StyledText className="text-sm text-gray-600">
                  Created At: {formatDate(new Date(department.createdAt))}
                </StyledText>
                <StyledText className="text-sm text-gray-600">
                  Updated At: {formatDate(new Date(department.updatedAt))}
                </StyledText>
              </StyledView>
            </TouchableOpacity>
          ))
        ) : (
          <StyledText>No departments available.</StyledText>
        )}

        {/* Modal for Editing/Creating */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-orange-200 bg-opacity-50">
            <View className="bg-white p-6 rounded-lg w-3/4">
              <Text className="text-xl font-bold mb-4">{isCreating ? "Create Department" : "Edit Department"}</Text>
              <TextInput
                placeholder="Department Name"
                value={selectedDepartment?.name || ""}
                onChangeText={(text) => setSelectedDepartment({ ...selectedDepartment, name: text })}
                className="border p-2 rounded mb-4"
              />
              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)} // Đóng modal khi nhấn "Cancel"
                  className="bg-gray-500 p-3 rounded-lg w-24 items-center"
                >
                  <Text className="text-white text-sm">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSave} // Gọi hàm handleSave để lưu thông tin
                  className="bg-green-500 p-3 rounded-lg w-24 items-center"
                >
                  <Text className="text-white text-sm">{isCreating ? "Create" : "Save"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </StyledView>
    </ScrollView>
  );
};

export default Departments;
