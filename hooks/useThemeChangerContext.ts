import ThemeChangerContext from "@/context/ThemeChangerContext";
import { useContext } from "react";

export const useThemeChangerContext = () => {
  const themeChanger = useContext(ThemeChangerContext);

  if (!themeChanger) {
    throw new Error(
      "useThemeChangerContext must be used within a ThemeChangerProvider"
    );
  }

  return themeChanger;
};
