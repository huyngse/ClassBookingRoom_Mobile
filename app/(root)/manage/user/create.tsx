import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { createUser } from "@/lib/api/user-api";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
const CreateUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const handleSubmit = async () => {
    const formData = {
      fullName,
      email,
      password,
      role,
    };
    const createResult = await createUser(formData);
    if (createResult.error) {
      Toast.show({
        text1: "Error",
        text2: createResult.error,
        position: "top",
      });
    } else {
      router.back();
    }
  };
  return (
    <View className="p-5">
      <Text className="text-2xl my-3">Create new user</Text>
      <View className="gap-3">
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Text className="font-semibold mt-3">Role</Text>
      <RNPickerSelect
        value={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        items={[
          { label: "Admin", value: "Admin" },
          { label: "Manager", value: "Manager" },
          { label: "Student", value: "Student" },
        ]}
      />
      <Button onPress={handleSubmit} mode="contained">
        Create
      </Button>
    </View>
  );
};

export default CreateUser;
