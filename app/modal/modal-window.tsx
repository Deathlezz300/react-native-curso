import { View, Text, Platform } from "react-native";
import React from "react";
import ThemedView from "@/presentation/shared/ThemedView";
import ThemedText from "@/presentation/shared/ThemedText";
import { StatusBar } from "expo-status-bar";
import ThemedButton from "@/presentation/shared/ThemedButton";
import { router } from "expo-router";

const ModalScreen = () => {
  return (
    <ThemedView
      className="flex-1 flex flex-col gap-2 justify-center items-center"
      bgColor="#A52182"
    >
      <ThemedText>Hola, soy un modal</ThemedText>
      <ThemedButton
        text="Abrir segundo modal"
        onPress={() => router.push("/modal/modal-second")}
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ThemedView>
  );
};

export default ModalScreen;
