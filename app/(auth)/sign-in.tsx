import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Link, router } from "expo-router";

const SignIn = () => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    router.replace('/(root)/(tabs)/home');
  }
  return (
    <View className="px-5 h-screen">
      <View className="justify-center gap-3 flex-1">
        <Text className="text-center text-purple-700 text-5xl mb-5">Login</Text>
        <TextInput
          label="Email"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          label="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Button
          mode="contained"
          onPress={login}
          className="p-1"
        >
          Continue
        </Button>
        <View className="flex-row justify-end">
          <Link href={"/(auth)/forgot-password"}>
            <Text className="text-end text-purple-700 text-xs">Forgot password?</Text>
          </Link>
        </View>
      </View>
      <Text className="text-center text-xs">© All right reversed</Text>
    </View>
  );
};

export default SignIn;
