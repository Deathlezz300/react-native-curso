import { View, Text, ViewProps } from "react-native";
import React from "react";

interface props extends ViewProps {
  className?: string;
}

const ThemedCard = ({ className, children, ...rest }: props) => {
  return (
    <View
      className={`bg-white dark:bg-black/10 rounded-xl p-2 shadow shadow-black/5 ${className}`}
      {...rest}
    >
        {children}
    </View>
  );
};

export default ThemedCard;
