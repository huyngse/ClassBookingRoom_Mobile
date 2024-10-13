import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { View, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const BarChartNe = () => {
  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 65, 76, 23, 56, 78, 90]
      }
    ]
  };

  const chartConfig = {
    backgroundColor: "#ff7f00",
    backgroundGradientFrom: "#ff9900",
    backgroundGradientTo: "#ffcc00",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Màu đen cho chữ
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Màu đen cho nhãn
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
    <View>
      <BarChart
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        data={data}
        width={screenWidth * 1}
        height={300} 
        chartConfig={chartConfig}
        verticalLabelRotation={90} 
        yAxisLabel="$"
        yAxisSuffix="k"
        fromZero={true}
        showValuesOnTopOfBars={true}
      />
    </View>
  );
};

export default BarChartNe;
