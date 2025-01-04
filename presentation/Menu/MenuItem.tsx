import { View, Text, Pressable } from "react-native";
import React from "react";
import { Href, router } from "expo-router";
import ThemedText from "../shared/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

interface props {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const MenuItem = ({ title, icon, name, isFirst, isLast }: props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Pressable
      onPress={() => router.push(name?.replace("/index", "") as Href)}
      className="bg-white dark:bg-black/15 px-5 py-2"
      style={{
        ...(isFirst && {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingTop: 10,
        }),

        ...(isLast && {
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingBottom: 10,
        }),
      }}
    >
      <View className="flex flex-row gap-3 items-center">
        <Ionicons name={icon} size={24} color={primaryColor} />
        <ThemedText type="normal">{title}</ThemedText>
      </View>
    </Pressable>
  );
};

export default MenuItem;
