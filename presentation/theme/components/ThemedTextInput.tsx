import { View, Text, TextInputProps, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { useThemeColor } from "../hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useFormContext } from "react-hook-form";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "../hooks/useColorScheme.web";

interface props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  name: string;
}

const ThemedTextInput = ({ icon, style, ...rest }: props) => {
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  const theme = useColorScheme();

  const [isActive, setIsActive] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const { control, watch } = useFormContext();

  const value = watch(rest.name);

  return (
    <Controller
      name={rest.name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              borderColor:
                error?.message && error?.message.length > 0
                  ? "red"
                  : isActive
                  ? primaryColor
                  : "#ccc",
            }}
            onTouchStart={() => inputRef.current?.focus()}
          >
            {icon && (
              <Ionicons
                name={icon}
                size={24}
                color={textColor}
                style={{
                  marginRight: 10,
                }}
              />
            )}
            <TextInput
              ref={inputRef}
              placeholderTextColor={theme === "dark" ? textColor : "#5c5c5c"}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              style={[
                {
                  color: textColor,
                  marginRight: 10,
                  flex: 1,
                },
                style,
              ]}
              value={field.value}
              onChangeText={field.onChange}
              {...rest}
            />
          </View>
          {error?.message && (
            <ThemedText
              style={{
                color: "red",
              }}
              type="default"
            >
              {error.message}
            </ThemedText>
          )}
        </View>
      )}
    />
  );
};

export default ThemedTextInput;
