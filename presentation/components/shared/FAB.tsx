import {
  View,
  Text,
  Pressable,
  ViewProps,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface props extends ViewProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  className?: string;
}

const FAB = ({ onPress, icon, className = "", ...other }: props) => {
  return (
    <View
      className={`z-[100] cursor-pointer absolute w-12 h-12 bg-black rounded-full flex justify-center items-center ${className}`}
      style={{
        shadowOffset: {
          height: 0.27,
          width: 4.5,
        },
        elevation: 5,
        shadowOpacity: 0.3,
      }}
      {...other}
    >
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={icon} color={"white"} size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default FAB;
