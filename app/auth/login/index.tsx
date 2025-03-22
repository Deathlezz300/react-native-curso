import {
  View,
  Text,
  KeyboardAvoidingView,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedText } from "@/presentation/auth/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/auth/theme/components/ThemedTextInput";
import { FormProvider, useForm } from "react-hook-form";
import ThemedButton from "@/presentation/auth/theme/components/ThemedButton";

interface formState {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const { height } = useWindowDimensions();

  const methods = useForm<formState>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data: formState) => {
    console.log(data);
  });

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          paddingHorizontal: 40,
        }}
      >
        <FormProvider {...methods}>
          <View
            style={{
              paddingTop: height * 0.35,
            }}
          >
            <ThemedText type="title">Ingresar</ThemedText>
            <ThemedText
              style={{
                color: "grey",
              }}
            >
              Por favor ingrese para continuar
            </ThemedText>
          </View>

          <View
            style={{
              paddingTop: 20,
            }}
          >
            <ThemedTextInput
              placeholder="Corre electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
              name="email"
            />

            <ThemedTextInput
              placeholder="Contraseña"
              secureTextEntry
              icon="lock-closed-outline"
              autoCapitalize="none"
              name="password"
            />

            <ThemedButton
              onPress={onSubmit}
              style={{
                marginTop: 8,
              }}
              icon="arrow-forward-outline"
            >
              Ingresar
            </ThemedButton>
          </View>
        </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
