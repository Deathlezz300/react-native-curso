import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

const ChatScreen = () => {
  const { id } = useLocalSearchParams();

  if (!id) return router.canGoBack() ? router.back() : router.replace("/");

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
          marginBottom: 10,
        }}
      >
        Chat id screen
      </ThemedText>
      <ThemedText
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginTop: 15,
        }}
      >
        Chat id:{id}
      </ThemedText>
    </SafeAreaView>
  );
};

export default ChatScreen;
