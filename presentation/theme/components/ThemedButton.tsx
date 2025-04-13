import {
  View,
  Text,
  PressableProps,
  Pressable,
  TextStyle,
  StyleProp,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

interface props extends PressableProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

const ThemedButton = ({
  children,
  icon,
  iconPosition = "right",
  style,
  textStyle,
  ...rest
}: props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? primaryColor + "90" : primaryColor,
          padding: 10,
          paddingVertical: 15,
          elevation: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        },
        style as any,
      ]}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <Ionicons
          name={icon}
          size={24}
          color={"white"}
          style={{ marginRight: 10, marginTop: 3 }}
        />
      )}

      <ThemedText
        style={[
          {
            fontWeight: "bold",
            color: "white",
          },
          textStyle,
        ]}
        type="default"
      >
        {children}
      </ThemedText>

      {icon && iconPosition === "right" && (
        <Ionicons
          name={icon}
          size={24}
          color={"white"}
          style={{ marginLeft: 3, marginTop: 3 }}
        />
      )}
    </Pressable>
  );
};

export default ThemedButton;
