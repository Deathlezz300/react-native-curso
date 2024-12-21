import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import MoviesService from "@/services/MoviesService";
import Loader from "@/components/Loader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MainSlideShow from "@/components/Movies/MainSlideShow";
import MovieHorizontalList from "@/components/Movies/MovieHorizontalList";

const MoviesHomeScreen = () => {
  const safeArea = useSafeAreaInsets();

  const {
    isFetching: nowPlayingQueryisFetching,
    isLoading: nowPlayingQueryisLoading,
    data: nowPlayingQueryData,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["nowPlaying"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      MoviesService.getNowPlayingMovies(pageParam),
    getNextPageParam: (lastPage) => lastPage?.nextPage,
  });

  const {
    isFetching: PopularQueryisFetching,
    isLoading: PopularQueryisLoading,
    data: PopularQueryData,
    isFetchingNextPage: PopularIsFetchinNextPage,
    fetchNextPage: PopularFetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["popular"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => MoviesService.getPopularMovies(pageParam),
    getNextPageParam: (lastPage) => lastPage?.nextPage,
  });

  const {
    isFetching: RatedQueryisFetching,
    isLoading: RatedQueryisLoading,
    data: RatedQueryData,
    isFetchingNextPage: RatedIsFetchinNextPage,
    fetchNextPage: RatedFetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["topRated"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => MoviesService.getTopRatedMovies(pageParam),
    getNextPageParam: (lastPage) => lastPage?.nextPage,
  });

  const {
    isFetching: UpcomingQueryisFetching,
    isLoading: UpcomingQueryisLoading,
    data: UpcomingQueryData,
    isFetchingNextPage: UpcomingIsFetchinNextPage,
    fetchNextPage: UpcomingFetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["upcoming"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => MoviesService.getUpcomingMovies(pageParam),
    getNextPageParam: (lastPage) => lastPage?.nextPage,
  });

  if (
    nowPlayingQueryisLoading ||
    PopularQueryisLoading ||
    RatedQueryisLoading ||
    UpcomingQueryisLoading
  )
    return <Loader size="large" color="blue" />;

  return (
    <ScrollView>
      <View
        className="bg-white flex-1 w-full flex-col gap-3 pb-10"
        style={{ paddingTop: safeArea.top }}
      >
        <MainSlideShow
          movies={
            nowPlayingQueryData?.pages
              ? nowPlayingQueryData.pages.flatMap((page) => page!.Movies)
              : []
          }
          title="Movies App"
          className="mb-6"
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
        <MovieHorizontalList
          movies={
            PopularQueryData?.pages
              ? PopularQueryData?.pages.flatMap((page) => page!.Movies)
              : []
          }
          title="Popular Movies"
          fetchNextPage={PopularFetchNextPage}
          isFetchingNextPage={PopularIsFetchinNextPage}
        />
        <MovieHorizontalList
          movies={
            RatedQueryData?.pages
              ? RatedQueryData.pages.flatMap((page) => page!.Movies)
              : []
          }
          title="Top Rated Movies"
          fetchNextPage={RatedFetchNextPage}
          isFetchingNextPage={RatedIsFetchinNextPage}
        />
        <MovieHorizontalList
          movies={
            UpcomingQueryData?.pages
              ? UpcomingQueryData.pages.flatMap((page) => page!.Movies)
              : []
          }
          title="Upcoming Movies"
          fetchNextPage={UpcomingFetchNextPage}
          isFetchingNextPage={UpcomingIsFetchinNextPage}
        />
      </View>
    </ScrollView>
  );
};

export default MoviesHomeScreen;
