import { View, Text } from "react-native";
import React from "react";
import { CompleteMovie } from "@/interface";
import { Formatter } from "@/helpers/formatter";

interface props {
  movie: CompleteMovie;
}

const MovieDescription = ({ movie }: props) => {
  return (
    <View className="px-5 pb-6">
      <View className="flex items-center flex-row gap-1 py-2">
        <Text className="text-xl">{movie.rating} - </Text>
        {movie.generes.map((genere, index) => (
          <Text className="p-2 w-fit bg-black rounded-lg text-white" key={`genere ${genere}-${index}`}>{genere}</Text>
        ))}
      </View>

      <Text className="font-bold">
         Historia
      </Text>
      <Text className="font-normal">
        {movie.description}
      </Text>

      <Text className="font-bold text-2xl">
         {Formatter.currency(movie.budget)}
      </Text>

    </View>
  );
};

export default MovieDescription;
