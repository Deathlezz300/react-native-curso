import { createContext } from "react";

interface ThemeChangerContextType {
  currentTheme: "dark" | "light";
  isSystemTheme: boolean;
  toogleTheme: () => void;
  setSystemTheme: (value: boolean) => void;
  isDarkMode: boolean;
}

const ThemeChangerContext = createContext<ThemeChangerContextType>(
  {} as ThemeChangerContextType
);

export default ThemeChangerContext;