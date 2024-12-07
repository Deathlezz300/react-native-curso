import { View, Text } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "@/components/drawer/CustomDrawer";

const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={(props)=><CustomDrawer {...props} />}
      screenOptions={{
        overlayColor: "rgba(0,0,0,0.5)",
        drawerActiveTintColor: "purple",
        sceneStyle: { backgroundColor: "white" , borderRadius:0 },
        headerShadowVisible: false,
      }}
    >
      <Drawer.Screen
        name="user/index"
        options={{
          title: "User",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="tabs"
        options={{
          title: "Tabs",
          drawerIcon: () => (
            <Ionicons name="albums-outline" size={24} color="purple" />
          ),
        }}
      />
      <Drawer.Screen
        name="schedule/index"
        options={{
          title: "Schedule",
          drawerIcon: () => (
            <Ionicons name="calendar" size={24} color="purple" />
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
