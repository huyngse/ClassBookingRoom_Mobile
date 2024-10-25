import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import useAuthStore from "@/store/AuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkToken } from "@/lib/api/auth-api";
import Toast from "react-native-toast-message";

const Home = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const loggedUser = useAuthStore((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (accessToken == null) return;
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
    };
    fetchData();
  }, [setUser]);
  const isSignedIn = loggedUser != null;

  if (isSignedIn) {
    return (
      <>
        <Redirect href={"/(root)/(tabs)/home"} />
      </>
    );
  }
  return (
    <>
      <Redirect href="/(auth)/sign-in" />
    </>
  );
};

export default Home;
