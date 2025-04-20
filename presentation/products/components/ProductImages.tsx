import { Image, FlatList, useWindowDimensions } from "react-native";
import React, { memo } from "react";
import { ThemedView } from "@/presentation/theme/components/ThemedView";

interface props {
  images: string[];
}

const NoProductImage=require("../../../assets/images/no-product-image.png")

const ProductImages = memo(({ images }: props) => {
  if (!images || images.length === 0)
    return (
      <ThemedView
        style={{
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      >
        <Image
          source={NoProductImage}
          style={{
            width: 300,
            height: 300,
          }}
        />
      </ThemedView>
    );

  const { width } = useWindowDimensions();

  return (
    <ThemedView
      style={{
        marginHorizontal: 10,
        marginVertical: 5,
        width: "100%",
      }}
    >
      <FlatList
        data={images}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{
              width: width - 60,
              height: 300,
              borderRadius: 10,
              marginHorizontal: 5,
            }}
          />
        )}
        snapToInterval={width - 30}
        style={{
          marginRight: 20,
        }}
      />
    </ThemedView>
  );
});

ProductImages.displayName = 'ProductImages';

export default ProductImages;
