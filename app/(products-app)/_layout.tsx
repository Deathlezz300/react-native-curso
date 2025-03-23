import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useAuthStore } from "@/presentation/auth/hooks/useAuthStore";
import { Redirect, Stack } from "expo-router";
import { useThemeColor } from "@/presentation/auth/theme/hooks/useThemeColor";
import LogOutIconButton from "@/presentation/auth/components/LogOutIconButton";

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();

  const backgroundColor = useThemeColor({}, "background");

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "loading")
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  if (status === "unauthenticated") return <Redirect href="/auth/login" />;

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        contentStyle:{
          backgroundColor:backgroundColor
        },
        headerRight: () => <LogOutIconButton />,
      }}
    >
      <Stack.Screen
        name="(home)/index"
        options={{
          title: "Productos",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default CheckAuthenticationLayout;
