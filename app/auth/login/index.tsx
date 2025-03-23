import {
  View,
  Text,
  KeyboardAvoidingView,
  useWindowDimensions,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { ThemedText } from "@/presentation/auth/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/auth/theme/components/ThemedTextInput";
import { FormProvider, useForm } from "react-hook-form";
import ThemedButton from "@/presentation/auth/theme/components/ThemedButton";
import ThemedLink from "@/presentation/auth/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/auth/theme/hooks/useThemeColor";
import { useAuthStore } from "@/presentation/auth/hooks/useAuthStore";
import { useRouter } from "expo-router";

interface formState {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const { height } = useWindowDimensions();

  const backgroundColor = useThemeColor({}, "background");

  const { login } = useAuthStore();

  const router = useRouter();

  const methods = useForm<formState>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: formState) => {
    const isSuccessfull = await login(data.email, data.password);

    if (!isSuccessfull) return Alert.alert("Error", "Credenciales incorrectas");

    router.replace("/");
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
              disabled={isSubmitting}
            >
              Ingresar
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
              <ThemedText>¿No tienes cuenta?</ThemedText>

              <ThemedLink
                href="/auth/register"
                style={{
                  marginHorizontal: 5,
                }}
              >
                Crear cuenta
              </ThemedLink>
            </View>
          </View>
        </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
