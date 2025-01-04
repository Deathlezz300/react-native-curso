import ThemedCard from "@/presentation/shared/ThemedCard";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedTextInput from "@/presentation/shared/ThemedTextInput";
import ThemedView from "@/presentation/shared/ThemedView";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const isIOS = Platform.OS === "ios";

const TextInputsScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const onChangeValue = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={isIOS ? "height" : undefined}>
        <ScrollView>
          <ThemedView margin className="flex flex-col gap-2">
            <ThemedCard>
              <ThemedTextInput
                value={form.name}
                placeholder="Nombre completo"
                onChangeText={(value) => onChangeValue("name", value)}
              />

              <ThemedTextInput
                value={form.email}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                onChangeText={(value) => onChangeValue("email", value)}
              />
            </ThemedCard>
            {Array.from({ length: 8 }).map((_, index) => (
              <ThemedCard key={index}>
                <ThemedText type="normal">
                  {JSON.stringify(form, null, 2)}
                </ThemedText>
              </ThemedCard>
            ))}

            <ThemedCard>
              <ThemedTextInput
                value={form.phone}
                placeholder="Teléfono"
                keyboardType="phone-pad"
                onChangeText={(value) => onChangeValue("phone", value)}
              />
            </ThemedCard>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default TextInputsScreen;
