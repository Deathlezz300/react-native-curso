import { ActivityIndicator, View } from "react-native";
import { useThemeColor } from "../theme/hooks/useThemeColor";

export const FullScreenLoader = () => {
  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={primaryColor} />
    </View>
  );
};
