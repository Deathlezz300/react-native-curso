import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/presentation/components/shared/ThemedText";
import { usePermissionsStore } from "@/store/usePermissions";
import { Pressable } from "react-native";

const PermissionsScreen = () => {
  const { locationStatus, requestLocationPermission } = usePermissionsStore();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Pressable
        onPress={requestLocationPermission}
        style={{
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 10,
        }}
      >
        <ThemedText
          style={{
            fontWeight: "bold",
          }}
        >
          Habilitar ubicación
        </ThemedText>
      </Pressable>

      <ThemedText>Permission Status : {locationStatus}</ThemedText>
    </SafeAreaView>
  );
};

export default PermissionsScreen;
