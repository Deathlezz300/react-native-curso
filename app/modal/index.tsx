import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { Link, router } from "expo-router";
import { View, Text } from "react-native";

const ModalScreen = () => {
  return (
    <ThemedView>
      <ThemedButton
        text="Abrir modal"
        onPress={() => {
          router.push("/modal/modal-window");
        }}
      />
    </ThemedView>
  );
};
export default ModalScreen;
