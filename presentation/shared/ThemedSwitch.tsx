import { Pressable, Switch, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import ThemedText from "./ThemedText";

interface props {
  isActive: boolean;
  className?: string;
  text?: string;
  onChangeValue: (value: boolean) => void;
}

const ThemedSwitch = ({ isActive, onChangeValue, text }: props) => {
  return (
    <Pressable
      className="w-full flex flex-row items-center justify-between"
      onPress={() => onChangeValue(!isActive)}
    >
      {text ? (
        <ThemedText type="normal" className="ml-2 font-semibold">
          {text}
        </ThemedText>
      ) : (
        <View />
      )}
      <Switch
        trackColor={{ false: "#767577", true: Colors.light.primary }}
        thumbColor={isActive ? Colors.dark.primary : "#f4f3f4"}
        ios_backgroundColor={Colors.dark.primary}
        value={isActive}
      />
    </Pressable>
  );
};

export default ThemedSwitch;
