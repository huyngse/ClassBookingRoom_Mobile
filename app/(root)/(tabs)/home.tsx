import { View, Text, ScrollView } from "react-native";
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
      <ScrollView className="px-3">
        <View className="p-3">
          <Text className="text-2xl text-center font-semibold">Dashboard</Text>
        </View>
        <View className="bg-white p-3">
          <View className="flex-row gap-2 mb-2">
            <View className="bg-blue-500 rounded-lg flex-1 py-3">
              <Text className="text-center text-white">Empty rooms</Text>
              <Text className="text-center text-4xl text-white">15</Text>
            </View>
            <View className="bg-green-500 rounded-lg flex-1 py-3">
              <Text className="text-center text-white">Pending requests</Text>
              <Text className="text-center text-4xl  text-white">2</Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <View className="bg-red-500 rounded-lg flex-1 py-3">
              <Text className="text-center text-white">Total rooms</Text>
              <Text className="text-center text-4xl text-white">15</Text>
            </View>
            <View className="bg-yellow-400 rounded-lg flex-1 py-3">
              <Text className="text-center">Total requests</Text>
              <Text className="text-center text-4xl">10</Text>
            </View>
          </View>
        </View>
        <View className="pt-5 pb-5">
          <PieChartNe />
        </View>
        <View className="pt-5">
          <LineChartNe />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
