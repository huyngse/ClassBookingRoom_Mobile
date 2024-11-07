import { View, Text, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import PieChartNe from "@/components/PieChart";
import LineChartNe from "@/components/LineChart";
import { useFocusEffect } from "expo-router";
import { getDashboard } from "@/lib/api/mana-api";
import Toast from "react-native-toast-message";
import { Loader } from "lucide-react-native";

const Home = () => {
  const [dashboardData, setDashboardData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const dashboardResult = await getDashboard();
    if (dashboardResult.error) {
      Toast.show({
        text1: "Error",
        text2: dashboardResult.error,
        position: "top",
      });
    } else {
      setDashboardData(dashboardResult.data);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  )
  if (isLoading) return <Loader />;
  if (dashboardData == null) return (
    <SafeAreaView>
      <Text className="text-red-500 text-4xl">Error while loading dashboard data</Text>
    </SafeAreaView>
  )
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
              <Text className="text-center text-white">Total students</Text>
              <Text className="text-center text-4xl text-white">{dashboardData?.totalStudent}</Text>
            </View>
            <View className="bg-green-500 rounded-lg flex-1 py-3">
              <Text className="text-center text-white">Total reports</Text>
              <Text className="text-center text-4xl  text-white">{dashboardData?.totalReport}</Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <View className="bg-red-500 rounded-lg flex-1 py-3">
              <Text className="text-center text-white">Total rooms</Text>
              <Text className="text-center text-4xl text-white">{dashboardData?.totalRoom}</Text>
            </View>
            <View className="bg-yellow-400 rounded-lg flex-1 py-3">
              <Text className="text-center">Total bookings</Text>
              <Text className="text-center text-4xl">{dashboardData?.totalBooking}</Text>
            </View>
          </View>
        </View>
        <View className="pt-5 pb-5">
          <PieChartNe data={dashboardData?.percentUserInCohort}/>
        </View>
        <View className="pt-5">
          <LineChartNe chartData={dashboardData?.totalBookinginMonth}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
