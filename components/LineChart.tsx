import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const LineChartNe = () => {
  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 65, 76, 23, 56, 78, 90],
        strokeWidth: 2, // Độ dày của đường kẻ
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Màu của đường kẻ
      }
    ],
    legend: ["Booking per month"] 
  };

  const chartConfig = {
    backgroundColor: "#ffffff", 
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff", 
    decimalPlaces: 0, 
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffcc00"
    }
  };

  return (
    <View style={{ alignItems: 'center', marginVertical: 8 }}>
      <LineChart
        style={{
          borderRadius: 16
        }}
        data={data}
        width={screenWidth} 
        height={240}  
        chartConfig={chartConfig}
        bezier 
        verticalLabelRotation={20} 
        yAxisLabel="$"
        yAxisSuffix="k"
        fromZero={true}
      />
    </View>
  );
};

export default LineChartNe;
