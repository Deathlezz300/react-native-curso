import { Pressable, Text, type PressableProps } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/global-styles";
import { ButtonVariants } from "@/interface";
import { Colors } from "@/constants/Colors";
import * as Haptics from 'expo-haptics';

interface props extends PressableProps {
  variant: ButtonVariants;
  label: string;
  onPressAction:()=>void;
}

const CalculatorButton = ({ variant, label , onPressAction , ...rest }: props) => {
  return (
    <Pressable
      style={ ({ pressed }) => [
        globalStyles.buttonCalculator,
        variant === "operator" && { backgroundColor: Colors.orange },
        variant === "action" && { backgroundColor: Colors.lightGray },
        label === "0" && { flex: 2 },
        pressed && { opacity: 0.7 },
      ]}
      onPress={()=>{
        Haptics.selectionAsync()
        onPressAction();
      }}
      {...rest}
    >
      <Text
        style={[
          globalStyles.buttonText,
          variant === "action" && { color: Colors.darkGray },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default CalculatorButton;
