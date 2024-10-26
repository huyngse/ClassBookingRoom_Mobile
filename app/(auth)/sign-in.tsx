import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  MD2Colors,
  TextInput,
} from "react-native-paper";
import { router } from "expo-router";
import { checkToken, loginEmail } from "@/lib/api/auth-api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import useAuthStore from "@/store/AuthStore";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore(state => state.setUser);
  const login = async () => {
    setIsLoading(true);
    const loginResult = await loginEmail(email, password);
    if (loginResult.error) {
      Toast.show({
        text1: "Error",
        text2: loginResult.error,
        position: "top",
      });
    } else {
      await AsyncStorage.setItem("accessToken", loginResult.data);
      const userResult = await checkToken();
      if (userResult.error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: userResult.error,
        });
        localStorage.removeItem("accessToken");
      } else {
        setUser(userResult.data ? userResult.data : null);
      }
      router.replace("/(root)/(tabs)/home");
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView className="p-5 bg-white flex-1">
      <View className="items-center">
        <Image
          source={require("../../assets/images/logo2-.png")}
          className="w-48 h-[30px]"
          resizeMode="contain"
        />
      </View>
      <View className="justify-center gap-4 flex-1">
        <View className="flex items-center pb-6">
          <Text className="text-center text-orange-500 text-4xl font-bold ">
            FPT Booking Room
          </Text>
          <Text>For Staff</Text>
        </View>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          className="mb-3"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          mode="outlined"
          className="mb-6"
        />
        <Button
          mode="contained"
          onPress={login}
          className="py-1 rounded-lg"
          buttonColor="orange"
        >
          {isLoading ? (
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          ) : (
            <Text className="text-black">Login</Text>
          )}
        </Button>

        {/* <View className="flex-row justify-end mt-3">
          <Link href={"/(auth)/forgot-password"}>
            <Text className="text-end text-purple-700 text-sm">
              Forgot password?
            </Text>
          </Link>
        </View> */}

        {/* <View className="flex-row items-center my-5">
          <View className="flex-1 h-[1px] bg-gray-300" />
          <Text className="mx-3 text-gray-600">Or</Text>
          <View className="flex-1 h-[1px] bg-gray-300" />
        </View>

        <View className="items-center mt-8">
          <TouchableOpacity
            onPress={() => {}}
            className="w-64 flex-row items-center justify-center py-3 bg-white rounded-lg border border-gray-300"
          >
            <Image source={require("../../assets/images/google.webp")} className="w-6 h-6 mr-2" resizeMode="contain" />
            <Text className="text-black text-lg">Login with Google</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <Text className="text-center text-xs text-gray-600 mt-5">
        © FPT Booking Room
      </Text>
      <ExpoStatusBar style="dark" />
    </SafeAreaView>
  );
};

export default SignIn;
