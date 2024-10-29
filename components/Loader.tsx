import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const Loader = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator
        animating={true}
        color={MD2Colors.red800}
        size={"large"}
      />
    </View>
  );
};

export default Loader;
