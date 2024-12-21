import {
  View,
  Text,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React from "react";
import { IMovie } from "@/interface";
import MovieItem from "./MovieItem";

interface props {
  movies: IMovie[];
  title: string;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

const MovieHorizontalList = ({
  movies,
  title,
  fetchNextPage,
  isFetchingNextPage,
}: props) => {
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isFetchingNextPage) return;

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;

    if (isEndReached) {
      fetchNextPage();
    }
  };

  return (
    <View className="w-full flex flex-col gap-4">
      <Text className="text-3xl font-bold px-4">{title}</Text>
      <FlatList
        horizontal
        data={movies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index) => `${item.id.toString()} movie ${index}`}
        onScroll={onScroll}
        renderItem={({ item }) => (
          <MovieItem
            id={item.id}
            poster={item.poster}
            smallPoster={true}
            className="px-2"
          />
        )}
      />
    </View>
  );
};

export default MovieHorizontalList;
