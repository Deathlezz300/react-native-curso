import { useColorScheme } from "@/presentation/hooks/useColorScheme.web";
import PermissionCheckerProvider from "@/providers/PermissionCheckerProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PermissionCheckerProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="maps/index"
            options={{
              title: "Maps",
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="loading/index"
            options={{
              title: "Loading",
              animation: "none",
            }}
          />
          <Stack.Screen
            name="permissions/index"
            options={{
              title: "Permissions",
              animation: "fade",
            }}
          />
        </Stack>
      </PermissionCheckerProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
