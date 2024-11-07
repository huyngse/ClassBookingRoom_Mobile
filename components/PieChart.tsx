import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const hexColors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F1C40F",
  "#E74C3C",
  "#8E44AD",
  "#3498DB",
  "#2ECC71",
  "#1ABC9C",
  "#16A085",
  "#F39C12",
  "#D35400",
  "#C0392B",
  "#9B59B6",
  "#34495E",
  "#27AE60",
  "#2980B9",
  "#8E44AD",
  "#2C3E50",
  "#95A5A6",
];
/* 
[
            {
              name: "K15",
              population: 10,
              color: "#FF6F61",
              legendFontColor: "#333",
              legendFontSize: 15,
            },
            {
              name: "K16",
              population: 20,
              color: "#6B5B95",
              legendFontColor: "#333",
              legendFontSize: 15,
            },
            {
              name: "K17",
              population: 40,
              color: "#88B04B",
              legendFontColor: "#333",
              legendFontSize: 15,
            },
            {
              name: "K18",
              population: 10,
              color: "#F7CAC9",
              legendFontColor: "#333",
              legendFontSize: 15,
            },
            {
              name: "K19",
              population: 10,
              color: "#92A8D1",
              legendFontColor: "#333",
              legendFontSize: 15,
            },
            {
              name: "K20",
              population: 10,
              color: "#955251",
              legendFontColor: "#333",
              legendFontSize: 15,
            },
          ]
*/
export default function PieChartNe({ data }: { data: any }) {
  return (
    <View>
      <Text className="text-2xl text-center mb-3">Statistics</Text>
      <View className="bg-white rounded-lg drop-shadow">
        <PieChart
          data={data.map((d: any, index: number) => ({
            name: d.cohortCode,
            population: d.percentStudent,
            color: hexColors[index],
            legendFontColor: "#333",
            legendFontSize: 15,
          }))}
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
          // absolute // Hiển thị số liệu trực tiếp trên biểu đồ
        />
      </View>
    </View>
  );
}

export function StatisticsScreen({ data }: { data: any }) {
  return (
    <View>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Statistics for school years
      </Text>
      {
        data && (
          <PieChartNe data={data}/>
        )
      }
    </View>
  );
}
