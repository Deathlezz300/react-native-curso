import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useAuthStore } from "@/presentation/auth/hooks/useAuthStore";
import { Redirect, Stack } from "expo-router";

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();

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
    <Stack>

        <Stack.Screen
            name="(home)/index"
            options={{
                title:"Productos",
            }}
        >

        </Stack.Screen>

    </Stack>
  );
};

export default CheckAuthenticationLayout;
