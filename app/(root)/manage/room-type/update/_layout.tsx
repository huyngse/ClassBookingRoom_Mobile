import { Stack } from "expo-router";

const UpdateLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default UpdateLayout;
