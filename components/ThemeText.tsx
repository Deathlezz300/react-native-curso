import { View, Text, type TextProps } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/global-styles";

type variantTypes="primary" | "secondary";

interface props extends TextProps {
  variant?: variantTypes;
}

const ThemeText = ({ children, variant = "primary", ...rest }: props) => {
  return (
    <Text
      style={[
        { color: "white", fontFamily: "SpaceMono" },
        variant === "primary" && globalStyles.mainResult,
        variant === "secondary" && globalStyles.subResult,
      ]}
      numberOfLines={1} adjustsFontSizeToFit
      {...rest}
    >
      {children}
    </Text>
  );
};

export default ThemeText;
