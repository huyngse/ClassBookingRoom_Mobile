import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function PieChartNe() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: "#333" }}>
        Pie Chart Demo
      </Text>
      <PieChart
        data={[
          { name: "K15", population: 10, color: "#FF6F61", legendFontColor: "#333", legendFontSize: 15 },  
          { name: "K16", population: 20, color: "#6B5B95", legendFontColor: "#333", legendFontSize: 15 },  
          { name: "K17", population: 40, color: "#88B04B", legendFontColor: "#333", legendFontSize: 15 },  
          { name: "K18", population: 10, color: "#F7CAC9", legendFontColor: "#333", legendFontSize: 15 },  
          { name: "K19", population: 10, color: "#92A8D1", legendFontColor: "#333", legendFontSize: 15 },  
          { name: "K20", population: 10, color: "#955251", legendFontColor: "#333", legendFontSize: 15 },  
        ]}
        width={screenWidth * 0.9}  
        height={220}
        chartConfig={{
          backgroundColor: "#f5f5f5",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,  
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
      
      />
    </View>
  );
}

export function StatisticsScreen() {
  return (
    <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Statistics for school years</Text>
      <PieChartNe />
    </View>
  );
}
