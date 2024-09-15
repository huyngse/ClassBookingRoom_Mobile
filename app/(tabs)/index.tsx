import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-3xl text-green-600">Hello world</Text>
      </View>
    </SafeAreaView>
  );
}
