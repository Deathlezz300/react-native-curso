import {
  View,
  Text,
  KeyboardAvoidingView,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { FormProvider, useForm } from "react-hook-form";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "@/presentation/auth/hooks/useAuthStore";

interface formState {
  email: string;
  password: string;
  fullName: string;
}

const RegisterScreen = () => {
  const { height } = useWindowDimensions();

  const backgroundColor = useThemeColor({}, "background");

  const { }=useAuthStore();

  const methods = useForm<formState>({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
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
          backgroundColor: backgroundColor,
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
              Por favor crea una cuenta para continuar
            </ThemedText>
          </View>

          <View
            style={{
              paddingTop: 20,
            }}
          >
            <ThemedTextInput
              placeholder="Nombre completo"
              icon="person-outline"
              name="fullName"
              autoCapitalize="words"
            />

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
              Crear cuenta
            </ThemedButton>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <ThemedText>¿Tienes cuenta?</ThemedText>

              <ThemedLink
                href="/auth/login"
                style={{
                  marginHorizontal: 5,
                }}
              >
                Iniciar sesión
              </ThemedLink>
            </View>
          </View>
        </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
