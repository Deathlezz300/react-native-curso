import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedView from "@/presentation/shared/ThemedView";
import { useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";

const PullToRefreshScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const primaryColor = useThemeColor({}, "primary");

  const onRefresh = async () => {
    setRefreshing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={[primaryColor]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <ThemedView></ThemedView>
    </ScrollView>
  );
};
export default PullToRefreshScreen;
