import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { usePushNotifications } from "@/hooks";

const PushAppScreen = () => {
  const { expoPushToken, notifications } = usePushNotifications();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}
    >
      <ThemedText
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginTop: 15,
        }}
      >
        Your expo push notifications
      </ThemedText>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.request.identifier}
        renderItem={({ item }) => (
          <View>
            <ThemedText style={{ fontWeight: "bold" }}>
              {item.request.content.title}
            </ThemedText>
            <ThemedText>
              {JSON.stringify(item.request.content.data, null, 2)}
            </ThemedText>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "grey" }} />
        )}
      />
    </SafeAreaView>
  );
};

export default PushAppScreen;
