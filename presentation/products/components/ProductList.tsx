import { View, Text, FlatList, RefreshControl } from "react-native";
import React from "react";
import { Product } from "@/core/interfaces";
import { ProductCard } from "./ProductCard";
import { useQueryClient } from "@tanstack/react-query";
import { usePullToRefresh } from "@/presentation/hooks/usePullToRefesh";

interface props {
  products: Product[];
  fetchNextPage: () => void;
}

const ProductList = ({ products, fetchNextPage }: props) => {
  const queryClient = useQueryClient();

  const PullToRefresh = async () => {
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });
  };

  const { onPullToRefresh, refreshing } = usePullToRefresh(400, PullToRefresh);

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl onRefresh={onPullToRefresh} refreshing={refreshing} />
      }
    />
  );
};

export default ProductList;
