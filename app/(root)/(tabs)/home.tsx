import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import PieChartNe from "@/components/PieChart";
import BarChartNe from "@/components/LineChart";
import LineChartNe from "@/components/LineChart";

const Home = () => {
  return (
    <SafeAreaView>
      <ExpoStatusBar style="dark" />
      <View className="p-3">
        <Text className="text-2xl text-center font-semibold">Dashboard</Text>
      </View>
      <View className="px-3 gap-2">
        <View className="flex-row gap-2">
          <View className="bg-zinc-300 p-4 flex-1 rounded-lg">
            <Text className="text-center">Empty rooms</Text>
            <Text className="text-center text-4xl p-2">15</Text>
          </View>
          <View className="bg-zinc-300 p-4 flex-1 rounded-lg">
            <Text className="text-center">Pending requests</Text>
            <Text className="text-center text-4xl p-2">2</Text>
          </View>
        </View>
        <View className="flex-row gap-2">
          <View className="bg-zinc-300 p-4 flex-1 rounded-lg">
            <Text className="text-center">Total rooms</Text>
            <Text className="text-center text-4xl p-2">15</Text>
          </View>
          <View className="bg-zinc-300 p-4 flex-1 rounded-lg">
            <Text className="text-center">Total requests</Text>
            <Text className="text-center text-4xl p-2">10</Text>
          </View>
        </View>
        <View className="pt-28 pb-5">
          <PieChartNe />
        </View>
        <View className="pt-20">
          <LineChartNe />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
