import { View, Text, Dimensions, useWindowDimensions } from "react-native";
import React, { useRef } from "react";
import { IMovie } from "@/interface";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import MovieItem from "./MovieItem";

interface props {
  movies: IMovie[];
  title?: string;
  className?: string;
}

const MainSlideShow = ({ movies, title , className }: props) => {
  const ref = useRef<ICarouselInstance>(null);

  const width=useWindowDimensions().width;

  return (
    <View className={`h-[250px] w-full ${className}`}>
      {title && (<Text className="text-3xl font-bold px-4">{title}</Text>)}
      <Carousel
        ref={ref}
        data={movies}
        renderItem={({ item }) => <MovieItem id={item.id} poster={item.poster} smallPoster={false}/>}
        width={200}
        height={350}
        style={{
          width,
          justifyContent: "center",
          alignItems: "center",
        }}
        mode="parallax"
        defaultIndex={0}
        modeConfig={{
          parallaxScrollingOffset:60,
          parallaxScrollingScale:0.9          
        }}
      />
    </View>
  );
};

export default MainSlideShow;
