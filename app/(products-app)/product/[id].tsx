import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import {
  RelativePathString,
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { FormProvider, useForm } from "react-hook-form";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "@/core/products/actions/get-product-by-id";
import { FullScreenLoader } from "@/presentation/shared/FullScreenLoader";
import ProductImages from "@/presentation/products/components/ProductImages";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import { GenderOptions, SizesOptions } from "@/constants/SizesOptions";
import { Gender, Size } from "@/core/interfaces";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { updateOrCreateProduct } from "@/core/products/actions/create-update-product-action";
import MenuIconButton from "@/presentation/products/components/MenuIconButton";

const ProductScreen = () => {
  const navigation = useNavigation();

  const primaryColor = useThemeColor({}, "primary");

  const queryClient = useQueryClient();

  const { id } = useLocalSearchParams();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id as string),
    enabled: !!id,
    staleTime: 60000,
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          icon="camera-outline"
          onPress={() => router.push("/camera" as RelativePathString)}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (isLoading || isFetching || !data) return;

    navigation.setOptions({
      title: data.title,
    });
  }, [data, isLoading, isFetching]);

  const methods = useForm<{
    title: string;
    slug: string;
    description: string;
    price: string;
    stock: string;
    sizes: Size[];
    images: string[];
    gender: Gender[];
  }>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      price: "0",
      stock: "0",
      sizes: [],
      images: [],
      gender: [Gender.Unisex],
    },
  });

  useEffect(() => {
    if (data) {
      methods.reset({
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: data.price.toString(),
        stock: data.stock.toString(),
        sizes: data.sizes,
        images: data.images,
        gender: [data.gender],
      });
    }
  }, [data]);

  const { handleSubmit, watch } = methods;

  const [images, gender] = watch(["images", "gender"]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const body = {
        ...data,
        gender: data.gender[0] as Gender,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        id: id as string,
      };

      const response = await updateOrCreateProduct(body);

      queryClient.setQueryData(["product", id], {
        title: response.title,
        slug: response.slug,
        description: response.description,
        price: response.price,
        stock: response.stock,
        sizes: response.sizes,
        images: body.images,
        user: response.user,
        gender: response.gender,
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      Alert.alert(
        id !== "new" ? "Producto actualizado" : "Producto creado",
        ""
      );
    } catch (error) {
      console.log(error);
    }
  });

  if (isLoading || isFetching) return <FullScreenLoader />;

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
          <ProductImages images={images} />
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
          </ThemedView>
          <ThemedButtonGroup
            name="sizes"
            multiple
            style={{
              marginBottom: 10,
            }}
            options={SizesOptions}
          />
          <ThemedButtonGroup
            name="gender"
            style={{
              marginBottom: 10,
            }}
            options={GenderOptions}
          />
          <ThemedView style={{ marginHorizontal: 10, marginBottom: 10 }}>
            <ThemedButton
              textStyle={{ color: "white" }}
              onPress={onSubmit}
              style={{ borderRadius: 8 }}
              icon="save-outline"
            >
              Guardar
            </ThemedButton>
          </ThemedView>
        </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;
