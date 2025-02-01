import ThemeChangerContext from "@/context/ThemeChangerContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeSettingsState {
  isDarkMode: boolean;
  isSystemTheme: boolean;
}

export const ThemeChangerProvider = ({ children }: PropsWithChildren) => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const [ThemeSettings, setThemeSettings] = useState<ThemeSettingsState>({
    isDarkMode: colorScheme === "dark",
    isSystemTheme: false,
  });

  const toogleTheme = () => {
    setThemeSettings({
      isDarkMode: !ThemeSettings.isDarkMode,
      isSystemTheme: false,
    });

    setColorScheme(ThemeSettings.isDarkMode ? "light" : "dark");

    saveOnStorage({
      isDarkMode: !ThemeSettings.isDarkMode,
      isSystemTheme: false,
    });
  };

  const setSystemTheme = (value: boolean) => {
    setThemeSettings((prev) => ({
      isDarkMode: false,
      isSystemTheme: value,
    }));

    setColorScheme(value ? "system" : "light");

    saveOnStorage({
      isDarkMode: false,
      isSystemTheme: value,
    });
  };

  const saveOnStorage = async (data: ThemeSettingsState) => {
    try {
      await AsyncStorage.setItem("ThemeSettings", JSON.stringify(data));
      const value = await AsyncStorage.getItem("ThemeSettings");
    } catch (error) {
      console.log(error);
    }
  };

  const loadStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("ThemeSettings");
      if (value !== null) {
        setThemeSettings(JSON.parse(value));
        const parsedData = JSON.parse(value);
        if (parsedData.isSystemTheme) {
          setColorScheme("system");
        } else if (parsedData.isDarkMode) {
          setColorScheme("dark");
        } else {
          setColorScheme("light");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStorage();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemeChangerContext.Provider
        value={{
          currentTheme: colorScheme === "dark" ? "dark" : "light",
          toogleTheme,
          setSystemTheme,
          isSystemTheme: ThemeSettings.isSystemTheme,
          isDarkMode: ThemeSettings.isDarkMode,
        }}
      >
        {children}
      </ThemeChangerContext.Provider>
    </ThemeProvider>
  );
};
