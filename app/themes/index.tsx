import { useThemeChangerContext } from "@/hooks/useThemeChangerContext";
import ThemedCard from "@/presentation/shared/ThemedCard";
import ThemedSwitch from "@/presentation/shared/ThemedSwitch";
import ThemedView from "@/presentation/shared/ThemedView";

const ThemesScreen = () => {
  const { isDarkMode, isSystemTheme, toogleTheme, setSystemTheme } =
    useThemeChangerContext();

  return (
    <ThemedView>
      <ThemedCard className="mt-5">
        <ThemedSwitch
          text="Dark Mode"
          className="mb-5"
          isActive={isDarkMode}
          onChangeValue={toogleTheme}
        />

        <ThemedSwitch
          text="System Mode"
          isActive={isSystemTheme}
          onChangeValue={setSystemTheme}
        />
      </ThemedCard>
    </ThemedView>
  );
};
export default ThemesScreen;
