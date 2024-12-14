import {
  View,
  Text,
  ActivityIndicator,
  ActivityIndicatorProps,
} from "react-native";
import React from "react";

interface props extends ActivityIndicatorProps {}

const Loader = (props: props) => {
  return (
    <View className="flex-1 justify-center items-center z-10">
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loader;
