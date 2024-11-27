import { Pressable, Text, type PressableProps } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/global-styles";
import { ButtonVariants } from "@/interface";
import { Colors } from "@/constants/Colors";

interface props extends PressableProps {
  variant: ButtonVariants;
  label: string;
  onPress:()=>void;
}

const CalculatorButton = ({ variant, label, ...rest }: props) => {
  return (
    <Pressable
      style={ ({ pressed }) => [
        globalStyles.buttonCalculator,
        variant === "operator" && { backgroundColor: Colors.orange },
        variant === "action" && { backgroundColor: Colors.lightGray },
        label === "0" && { flex: 2 },
        pressed && { opacity: 0.7 },
      ]}
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
