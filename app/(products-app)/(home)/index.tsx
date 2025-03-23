import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ThemedText } from "@/presentation/auth/theme/components/ThemedText";
import { useThemeColor } from "@/presentation/auth/theme/hooks/useThemeColor";

const HomeScreen = () => {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <ThemedText>Home Screen</ThemedText>
    </ScrollView>
  );
};

export default HomeScreen;
