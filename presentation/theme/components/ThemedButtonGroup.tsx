import { View, Text, StyleProp, ViewStyle, useColorScheme, TouchableOpacity } from "react-native";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

interface props {
  name: string;
  multiple?: boolean;
  style?: StyleProp<ViewStyle>;
  options: string[];
}

const ThemedButtonGroup = ({
  name,
  multiple = false,
  style,
  options,
}: props) => {
  const { control } = useFormContext();

  const primaryColor = useThemeColor({}, "primary");

  const backgroundColor = useThemeColor({}, "background");

  const textColor = useThemeColor({}, "text");

  const theme = useColorScheme();

  const handleClick = (value: string, currentValue: string[]) => {
    if (multiple) {
      return currentValue.includes(value)
        ? currentValue.filter((item) => item !== value)
        : [...currentValue, value];
    } else {
      return [value];
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ThemedView
          style={[
            {
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: 10,
              flexWrap: "wrap",
              paddingHorizontal: 10,
              justifyContent:"flex-start"
            },
            style,
          ]}
        >
          {options.map((value: string, index: number) => (
            <TouchableOpacity
              onPress={() => field.onChange(handleClick(value, field.value))}
              key={`${value}-${index}`}
              style={{
                width:"auto",
                minWidth:50,
                maxWidth:100,
                flex:1,
                borderRadius: 8,
                backgroundColor: field.value.includes(value)
                  ? primaryColor
                  : backgroundColor,
                padding: 10,
                paddingVertical: 15,
                elevation: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ThemedText
                style={{
                  fontWeight: "bold",
                  color: field.value.includes(value)
                    ? "white"
                    : theme === "dark"
                    ? "white" 
                    : "black",
                }}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {value}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      )}
    />
  );
};

export default ThemedButtonGroup;
