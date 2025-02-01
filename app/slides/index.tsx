import { items, Slide } from "@/data";
import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
} from "react-native";

const SlidesScreen = () => {
  const flatListRef = useRef<FlatList>(null);

  const [currentSlideIndex, setCurrenSlideIndex] = useState(0);

  const [enableScroll,setEnableScroll] = useState(false);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

    if(enableScroll) return ;

    const { contentOffset, layoutMeasurement } = event.nativeEvent;

    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);

    setCurrenSlideIndex(currentIndex ? currentIndex : 0);

    if(currentIndex===items.length-1){
      setEnableScroll(true);
    }

  };

  return (
    <ThemedView>
      <FlatList
        data={items}
        ref={flatListRef}
        keyExtractor={(item, index) => `${item.title} ${index}`}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        scrollEnabled={enableScroll}
        onScroll={onScroll}
      />
      {currentSlideIndex < items.length - 1 ? (
        <ThemedButton
          text="Siguiente"
          className="absolute bottom-10 right-5 w-[150px]"
          onPress={() =>
            flatListRef.current?.scrollToIndex({ index: currentSlideIndex + 1 })
          }
        />
      ) : (
        <ThemedButton
          text="Finalizar"
          className="absolute bottom-10 right-5 w-[150px]"
          onPress={() => router.dismiss()}
        />
      )}
    </ThemedView>
  );
};
export default SlidesScreen;

interface SlideItemProps {
  item: Slide;
}

const SlideItem = ({ item }: SlideItemProps) => {
  const { width } = useWindowDimensions();

  return (
    <ThemedView
      className="flex-1 rounded p-10 justify-center bg-red-500"
      style={{
        width,
      }}
    >
      <Image
        source={item.img}
        style={{
          width: width * 0.7,
          height: width * 0.7,
          resizeMode: "center",
          alignSelf: "center",
        }}
      />

      <ThemedText
        type="h1"
        className="text-light-primary dark:text-dark-primary"
      >
        {item?.title}
      </ThemedText>
      <ThemedText className="mt-10">{item?.desc}</ThemedText>
    </ThemedView>
  );
};
