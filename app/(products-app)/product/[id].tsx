import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/presentation/auth/theme/hooks/useThemeColor";
import { FormProvider, useForm } from "react-hook-form";
import { ThemedView } from "@/presentation/auth/theme/components/ThemedView";
import ThemedTextInput from "@/presentation/auth/theme/components/ThemedTextInput";

const ProductScreen = () => {
  const navigation = useNavigation();

  const primaryColor = useThemeColor({}, "primary");

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="camera-outline" size={25} color={primaryColor} />
      ),
    });
  }, []);

  const methods = useForm({});

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <FormProvider {...methods}>
          <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
            <ThemedTextInput placeholder="Titulo" name="title" />

            <ThemedTextInput placeholder="Slug" name="slug" />

            <ThemedTextInput
              placeholder="Descripcion"
              name="description"
              multiline
              numberOfLines={5}
              style={{
                marginVertical: 5,
              }}
            />
          </ThemedView>
          <ThemedView
            style={{
              marginHorizontal: 10,
              marginVertical: 5,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <ThemedTextInput
              placeholder="Precio"
              name="price"
              keyboardType="numeric"
            />

            <ThemedTextInput
              placeholder="Inventario"
              name="stock"
              keyboardType="numeric"
            />

            <ThemedTextInput placeholder="Tallas" name="sizes" />
          </ThemedView>
        </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;
