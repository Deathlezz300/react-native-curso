import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { ThemedText } from "@/presentation/auth/theme/components/ThemedText";
import { useThemeColor } from "@/presentation/auth/theme/hooks/useThemeColor";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "@/core/products/actions/get-products";
import ProductList from "@/presentation/products/components/ProductList";

const HomeScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");

  const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      initialPageParam: 0,
      queryFn: ({ pageParam = 0 }) => getProducts(20, pageParam * 20),
      getNextPageParam: (lastPage, allPages) => allPages.length,
      staleTime:60000,
    });

  if (isLoading || isFetching) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <ProductList
        products={data?.pages.flatMap((page) => page) || []}
        fetchNextPage={fetchNextPage}
      />
    </View>
  );
};

export default HomeScreen;
