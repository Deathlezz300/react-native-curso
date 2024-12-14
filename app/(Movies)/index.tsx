import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import MoviesService from "@/services/MoviesService";
import Loader from "@/components/Loader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MainSlideShow from "@/components/Movies/MainSlideShow";
import MovieHorizontalList from "@/components/Movies/MovieHorizontalList";

const MoviesHomeScreen = () => {
  const safeArea = useSafeAreaInsets();

  const [nowPlayingQuery, PopularQuery, RatedQuery, UpcomingQuery] = useQueries(
    {
      queries: [
        {
          queryKey: ["nowPlayingMovies"],
          queryFn: () => MoviesService.getNowPlayingMovies(),
        },
        {
          queryKey: ["popularMovies"],
          queryFn: () => MoviesService.getPopularMovies(),
        },
        {
          queryKey: ["topRatedMovies"],
          queryFn: () => MoviesService.getTopRatedMovies(),
        },
        {
          queryKey: ["upcomingMovies"],
          queryFn: () => MoviesService.getUpcomingMovies(),
        },
      ],
    }
  );

  if (
    nowPlayingQuery.isFetching ||
    nowPlayingQuery.isLoading ||
    PopularQuery.isFetching ||
    PopularQuery.isLoading ||
    RatedQuery.isFetching ||
    RatedQuery.isLoading ||
    UpcomingQuery.isFetching ||
    UpcomingQuery.isLoading
  )
    return <Loader size="large" color="blue" />;

  return (
    <ScrollView>
      <View
        className="bg-white flex-1 w-full flex-col gap-3 pb-10"
        style={{ paddingTop: safeArea.top }}
      >
        <MainSlideShow
          movies={nowPlayingQuery.data ? nowPlayingQuery.data : []}
          title="Movies App"
          className="mb-6"
        />
        <MovieHorizontalList
          movies={PopularQuery.data ? PopularQuery.data : []}
          title="Popular Movies"
        />
        <MovieHorizontalList
          movies={RatedQuery.data ? RatedQuery.data : []}
          title="Top Rated Movies"
        />
        <MovieHorizontalList
          movies={UpcomingQuery.data ? UpcomingQuery.data : []}
          title="Upcoming Movies"
        />
      </View>
    </ScrollView>
  );
};

export default MoviesHomeScreen;
