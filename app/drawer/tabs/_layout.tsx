import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "purple", headerShown: false }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={24} color="purple" />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites/index"
        options={{
          title: "Favorites",
          tabBarIcon: () => (
            <Ionicons name="star-outline" size={24} color="purple" />
          ),
        }}
      />
      <Tabs.Screen
        name="(stack)"
        options={{
          title: "Stack",
          tabBarIcon: () => (
            <Ionicons name="person-add-outline" size={24} color="purple" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
