import { View, Text } from "react-native";
import React from "react";
import { Link, LinkProps } from "expo-router";
import { useThemeColor } from "../hooks/useThemeColor";

interface props extends LinkProps {}

const ThemedLink = ({ style, ...rest }: props) => {
  const primary = useThemeColor({}, "primary");

  return (
    <Link
      style={[
        {
          color: primary,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default ThemedLink;
