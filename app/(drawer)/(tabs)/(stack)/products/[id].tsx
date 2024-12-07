import { View, Text } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { products } from "@/data";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductItem from "@/components/products/ProductItem";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();

  const navigation=useNavigation();

  const product = useMemo(() => {
    return products.find((product) => product.id === id);
  }, [id]);


  useEffect(()=>{
    navigation.setOptions({
      title: product?.title ?? "Product"
    })
  },[product])

  if (!product) return <Redirect href="/products" />;

  return (
    <SafeAreaView className="flex-1 mt-3 mx-3">
      <ProductItem {...product} showDetails={false} />
    </SafeAreaView>
  );
};

export default ProductScreen;
