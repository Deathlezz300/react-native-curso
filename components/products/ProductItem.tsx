import { View, Text } from "react-native";
import React from "react";
import { Product } from "@/interface";
import { Link } from "expo-router";

interface props extends Product {
  showDetails?: boolean;
}

const ProductItem = ({
  id,
  title,
  description,
  price,
  showDetails = true,
}: props) => {
  return (
    <View className="flex my-2 flex-col gap-2 rounded-lg bg-slate-100 p-4">
      <Text className="text-lg font-works-black"> {title} </Text>
      <Text className="font-works-light text-justify "> {description} </Text>
      <View className="flex flex-row justify-between">
        <Text className="font-works-medium font-extrabold">{price}$</Text>
        {showDetails && (
          <Link
            className="font-works-medium font-extrabold text-primary"
            href={`/products/${id}`}
          >
            Ver detalles
          </Link>
        )}
      </View>
    </View>
  );
};

export default ProductItem;
