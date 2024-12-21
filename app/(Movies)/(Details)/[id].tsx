import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import MoviesService from "@/services/MoviesService";
import Loader from "@/components/Loader";
import MovieHeader from "@/components/Movies/MovieHeader";
import MovieDescription from "@/components/Movies/MovieDescription";


const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => MoviesService.getMovieDetails(+id),
  });

  if (isLoading || isFetching || !data)
    return <Loader size="large" color="blue" />;

  return (
    <SafeAreaView style={{ flex:1 }}>
        <ScrollView className="flex-1">
      <MovieHeader
        poster={data?.poster}
        title={data.title}
        originalTitle={data.originalTitle}
      />
      <MovieDescription movie={data} />
    </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetailsScreen;
