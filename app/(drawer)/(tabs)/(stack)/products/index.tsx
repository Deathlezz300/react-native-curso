import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "@/data";
import ProductItem from "@/components/products/ProductItem";

const ProductsScreen = () => {
  return (
    <SafeAreaView className="flex-1 mt-3 mx-3">
      <View className="flex-1 flex">
        <FlatList
          data={products}
          keyExtractor={(product) => product.id}
          renderItem={(product) => <ProductItem {...product.item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductsScreen;
