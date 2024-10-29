import { usePushNotification } from "@/hooks/usePushNotification";
import { updateUserPushToken } from "@/lib/api/user-api";
import useAuthStore from "@/store/AuthStore";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { expoPushToken } = usePushNotification();
  const loggedUser = useAuthStore((state) => state.user);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  const theme = {
    ...MD3LightTheme,
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#3498db",
      secondary: "#f1c40f",
      tertiary: "#a1b2c3",
    },
  };
  useEffect(() => {
    const submitUserPushToken = async () => {
      if (loggedUser != null && expoPushToken != null) {
        const updateTokenResult = await updateUserPushToken(
          loggedUser.id,
          expoPushToken.data
        );
        if (updateTokenResult.error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to update push token.",
          });
        }
      }
    };
    submitUserPushToken();
  }, [loggedUser, expoPushToken]);
  // colorScheme === "dark" ? DarkTheme : DefaultTheme
  if (!loaded) {
    return null;
  }
  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(root)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <Toast />
      </ThemeProvider>
    </PaperProvider>
  );
}
