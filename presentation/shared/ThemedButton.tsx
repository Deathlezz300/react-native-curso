import {  Text, PressableProps, Pressable } from "react-native";
import React from "react";

interface props extends PressableProps {
  className?: string;
    text: string;
}

const ThemedButton = ({ text , className , ...rest }: props) => {
  return (
    <Pressable
      className={`bg-light-primary dark:bg-dark-primary items-center rounded-xl px-6 py-2 active:opacity-90 ${className}`}
      {...rest}
    >
      <Text className="text-white text-2xl font-semibold">
        {text}
      </Text>
    </Pressable>
  );
};

export default ThemedButton;
