import React from "react";
import { SplashScreen, Stack } from "expo-router";
import "../styles/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ExternalProviders from "@/components/ExternalProviders";

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <ExternalProviders>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="(Movies)/index"
            options={{
              title: "Movies",
            }}
          />
        </Stack>
      </ExternalProviders>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
