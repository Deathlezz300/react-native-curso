import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { router } from "expo-router";

interface props {
  poster: string;
  id: number;
  smallPoster?: boolean;
  className?: string;
}

const MovieItem = ({ poster, id, className, smallPoster = false }: props) => {

  const navigateToDetails = () => {

     router.push(`/(Movies)/(Details)/${id}`);

  }

  return (
    <Pressable onPress={navigateToDetails} className={`active:opacity-90 px-2 ${className}`}>
      <Image
        source={{ uri: poster }}
        className="shadow-lg rounded-2xl h-full w-full"
        style={{
          height: smallPoster ? 130 : 250,
          width: smallPoster ? 85 : 150,
        }}
        resizeMode="cover"
      />
    </Pressable>
  );
};

export default MovieItem;
